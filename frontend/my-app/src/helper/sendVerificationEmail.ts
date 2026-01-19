import { resend } from "@/lib/resend";
import VerificationEmail from "../../email/VerificationEmail";
import { Apiresponse } from '@/types/ApiResponse';

export async function sendVerifictionemail(
  email: string,
  username: string,
  verifyCode: string
): Promise<Apiresponse> {

  try {
    await resend.emails.send({
      from: "Mystery <onboarding@resend.dev>",
      to: email,
      subject: "Mystery Message Verification Code",
      react: VerificationEmail({ username, otp: verifyCode }),
    });

    return {
      success: true,
      message: "Send verification email successfully."
    };

  } catch (error: any) {
    console.error("EMAIL SEND ERROR 👉", error);   // ⭐ IMPORTANT
    return {
      success: false,
      message: "Error to send verification email."
    };
  }
}
