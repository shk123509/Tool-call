import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  await dbConnect();

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "User does not exist" },
        { status: 400 }
      );
    }

    if (!user.isVerified) {
      return NextResponse.json(
        { message: "Please verify your account first" },
        { status: 400 }
      );
    }

    const isValid = await bcryptjs.compare(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 400 }
      );
    }

    const token = jwt.sign(
      {
        id: user._id.toString(),
        email: user.email,
      },
      process.env.TOKEN_SECRET!,
      { expiresIn: "1d" }
    );

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}
