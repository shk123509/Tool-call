import UserModel from "@/models/User";
import dbConnect from "@/lib/dbConnect"
import bcrypt from "bcryptjs";
import { sendVerifictionemail } from "@/helper/sendVerificationEmail";


export async function POST(request : Request) {
    await dbConnect()

    try {
    const {username, email, password} = await request.json();

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString()


    const existuserbyemailverifaction = await UserModel.findOne(
        {
            email,
            isVerified : true
        }
    )

    if (existuserbyemailverifaction) {
        return Response.json({
            message : "User exist with this same email",
            success : false
        },{status : 400})
    }

    const existuserwithemail = await UserModel.findOne(
        {
            email
        }
    )

    if (existuserwithemail) {
       if (existuserwithemail.isVerified) {
          return Response.json({
            message :"User already exist with this same emial.",
            success : false
        },{status : 400})
       }
       else {
        const hashpassword = await bcrypt.hash(password, 10);
        existuserwithemail.password = hashpassword;
        existuserwithemail.verifyCode = verifyCode;
        existuserwithemail.verifyCodeExpiry = new Date(Date.now() + 3600000)
        await existuserwithemail.save()
       }
    }
    else {
        const hashpassword = await bcrypt.hash(password, 10);

        const expire = new Date(Date.now() + 3600000)

        const createUser = await UserModel.create({
            username,
            email,
            password: hashpassword,
            verifyCode,
            verifyCodeExpiry:expire, 
            isVerified: false,
            isAcceptingMessages:true,
            messages: []
        })

        if (!createUser) {
            return Response.json({
            message :"User dose not created.",
            success : false
        },{status : 400})
        }
    }

    // Send verifaction code.
    const emailsendres = await sendVerifictionemail(email, username, verifyCode)

    if (!emailsendres.success) {
        return Response.json({
            message :"Somthing went wrong to send messages.",
            success : false
        },{status : 400})
    }

    return Response.json({
            message :"User register successfully Verify your account.",
            success : true
        },{status : 200})


    } catch (error) {
        return Response.json({
            message :error,
            success : false
        },{status : 500})
    }
}