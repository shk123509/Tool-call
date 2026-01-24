import { NextRequest } from "next/server";
import jwt from "jsonwebtoken"

export const getuserdetials = (request:NextRequest) =>{
    try {
        const token = request.cookies.get("token")?.value || ""

        const decodes : any = jwt.verify(token, process.env.TOKEN_SECRET!)

        return decodes.id


    } catch (error : any) {
        throw new Error(error.message)
    }
}