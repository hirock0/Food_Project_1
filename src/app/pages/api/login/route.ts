import { SignupSchema } from "@/lib/userSchema/schema";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Jwt from "jsonwebtoken";
import { ConnectionDB } from "@/lib/connectionDB/dbconnection";
ConnectionDB();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { emailOrnumber, password } = reqBody;
    const findUser = await SignupSchema.findOne({
      emailOrnumber: emailOrnumber,
    });
    if (!findUser) {
      return NextResponse.json({
        message1: "Email is not correct",
        success: false,
      });
    } else {
      const verifyPassword = await bcryptjs.compare(
        password,
        findUser.password
      );
      if (!verifyPassword) {
        return NextResponse.json({
          message2: "Password is not correct",
          success: false,
        });
      } else {
        const tokenData = {
          id: findUser._id,
          name: findUser.name,
          emailOrnumber: findUser.emailOrnumber,
        };
        const token = Jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
          expiresIn: "1d",
        });
        const response = NextResponse.json({
          message: "Data is found",
          success: true,
        });
        response.cookies.set("token", token, { httpOnly: true });
        return response;
      }
    }
  } catch (error: any) {
    return NextResponse.json({ message: "you are not logged", success: false });
  }
}
