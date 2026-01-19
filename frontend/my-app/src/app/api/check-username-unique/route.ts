import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect"
import {  z } from "zod"
import { usernamevalid } from "@/schema/singupSchema"


const Usernamevalided = z.object(
    {
        username: usernamevalid
    }
)

export async function GET(request: Request) {
    await dbConnect()

    try {
        const { searchParams } = new URL(request.url)

        const queryParams = {
            username: searchParams.get('username'),
        }

        const result = Usernamevalided.safeParse(queryParams)

        if (!result.success) {
            return Response.json(
                {
                    success: false,
                    message: "Invilid user query."
                },
                {
                    status: 400
                }
            )
        }

        const { username } = result.data

        

        const user = await UserModel.findOne(
            {
                username,
                isVerified: true
            }
        )

        if (user) {
            return Response.json(
                {
                    success: false,
                    message: "User name is already taken."
                },
                {
                    status: 200
                }
            )
        }


        return Response.json(
            {
                success: true,
                message: "User name is unique."
            },
            {
                status: 200
            }
        )



    } catch (error) {
        return Response.json(
            {
                success: false,
                message: "Somting went wrong to unique user find."
            },
            {
                status: 500
            }
        )
    }
}