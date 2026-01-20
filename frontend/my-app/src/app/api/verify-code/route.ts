import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect"



export async function POST(request: Request) {
    await dbConnect()

    try {

        const { username, code } = await request.json();

        if (!username) {
            return Response.json({ success: false, message: "user name is reuired fileds" }, { status: 400 })
        }

        if (!code) {
            return Response.json({ success: false, message: "code is reuired fileds" }, { status: 400 })
        }

        

        const decodeuser = decodeURIComponent(username)

        const user = await UserModel.findOne({ username: decodeuser })



        if (!user) {
            return Response.json({ success: false, message: "User dose not exist" }, { status: 400 })
        }

        const isCode = user.verifyCode === code;
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

        if (isCode && isCodeNotExpired) {
            user.isVerified = true
            await user.save()
            return Response.json({ success: true, message: "Account verified successfully" }, { status: 200 })
        }

        else if (!isCode) {
            return Response.json({ success: false, message: "code is not correct" }, { status: 400 })
        }

        else {
            return Response.json({ success: false, message: "date is expires." }, { status: 400 })
        }

        

    } catch (error: any) {
        return Response.json({ success: false, message: "somting went wrong while verify code." }, { status: 500 })
    }
}


