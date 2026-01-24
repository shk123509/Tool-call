import bcryptjs from "bcryptjs";
import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect"
import { NextRequest, NextResponse } from "next/server";
import { getuserdetials } from "@/helper/getUserdetials";



export async function POST(request: NextRequest) {
    try {
        await dbConnect()
        const reqBody = await request.json()

        const {oldPassword, Newpassword} = reqBody

       const userId  =  await getuserdetials(request)

        

        const user = await UserModel.findById(userId)

        if (!user) {
             return NextResponse.json(
            {
                error: "User dose not exist."
            },
            {
                status: 400
            }
        )
        }

        if (!oldPassword) {
            return NextResponse.json(
            {
                error: "Old password is required fields"
            },
            {
                status: 400
            }
        )
        }
        if (!Newpassword) {
            return NextResponse.json(
            {
                error: "Newpassword is required fields"
            },
            {
                status: 400
            }
        )
        }

        const validPassword = await bcryptjs.compare(oldPassword, user.password) 

         


        if (!validPassword) {
             return NextResponse.json(
            {
                error: "Password is not valid."
            },
            {
                status: 400
            }
        )
        }

        const salt = await bcryptjs.genSalt(10)
         const hashedPassword = await bcryptjs.hash(Newpassword, salt)


        const changespassword  = await UserModel.findByIdAndUpdate(
            userId,
            {
                $set : {
                    password : hashedPassword
                }
            },
            {
                new : true
            }
        ).select("-password")

        if (!changespassword) {
             return NextResponse.json(
            {
                error: "Password is not changes"
            },
            {
                status: 400
            }
        )
        }

        return NextResponse.json({
            message : "Password changes success",
        },{status : 200})


    } catch (error:any) {
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