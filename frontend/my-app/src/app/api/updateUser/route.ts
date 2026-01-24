import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect"
import { NextRequest, NextResponse } from "next/server";
import { getuserdetials } from "@/helper/getUserdetials";




export async function POST(request: NextRequest) {
    try {
        await dbConnect()
        const reqBody = await request.json();
        const {email,username} = reqBody
        if (!email) {
            return NextResponse.json(
            {
                error: "Email is reuired fields"
            },
            {
                status: 400
            }
        )
        }
         if (!username) {
            return NextResponse.json(
            {
                error: "Username is reuired fields"
            },
            {
                status: 400
            }
        )
        }
        

        const userId  =  await getuserdetials(request)

        const exist =  await UserModel.findById(userId)

        if (!exist) {
             return NextResponse.json(
            {
                error: "User is not exist."
            },
            {
                status: 400
            }
        )
        }

        const update = await UserModel.findByIdAndUpdate(
            userId,
            {
                $set : {
                    username,
                    email
                }
            },
            {
                new : true
            }
        ).select("-password")
        if (!update) {
            return NextResponse.json(
            {
                error: "Profiles  is not changed."
            },
            {
                status: 400
            }
           ) 
        }

        return NextResponse.json({
          message : "Profiles Updates success"
        },
    {
        status : 200
    })
    } catch (error : any) {
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