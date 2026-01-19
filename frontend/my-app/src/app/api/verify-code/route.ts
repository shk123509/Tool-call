import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect"
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"




export async function POST(request: NextRequest) {
    await dbConnect()
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody

        if (!email) {
            return NextResponse.json(
                {
                    message: "Email is reuired fileds"
                },
                {
                    status: 400
                }
            )
        }
        if (!password) {
            return NextResponse.json(
                {
                    message: "Password is reuired fileds"
                },
                {
                    status: 400
                }
            )
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json({ error: "User dose not exist" }, { status: 400 })
        }

        const valifPassword = await bcryptjs.compare(password, user.password)

        if (!valifPassword) {
            return NextResponse.json({ error: "Password is not corrects" }, { status: 400 })
        }

        const token =  jwt.sign(
            {
                id: user._id,
                email: user.email,
                password : user.password
            },
            process.env.TOKEN_SECRET!,
            {
                expiresIn: "1d"
            }
        )

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })

        return response



    } catch (error: any) {
        return NextResponse.json(
            {
                error: error.message
            },
            {
                status: 500
            }
        )
    }
}
