import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect"
import { NextRequest, NextResponse } from "next/server";
import { getuserdetials } from "@/helper/getUserdetials";




export async function GET(request:NextRequest) {
    try {
        await dbConnect()
        const userId  =  await getuserdetials(request)
       
        const user = await UserModel.findById(userId).select("-password")
    
        // Ckeck ser id ok
    
        if (!user) {
            return NextResponse.json({error:"User dos not exist"}, {status:400})
        }

        return NextResponse.json({
            mesaaage: "User found",
            data: user
        })


    } catch (error : any) {
        return NextResponse.json({error:error.message}, {status:500})
    }


}
