import { NextRequest, NextResponse } from "next/server";
import { ConnectionDB } from "@/lib/connectionDB/dbconnection";
import { SignupSchema } from "@/lib/userSchema/schema";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";
ConnectionDB();
export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { name, emailOrnumber, password, image } = reqBody;
    const hasedPassword = await bcrypt.hash(password, 10);
    const preSenddata = await new SignupSchema({
      name,
      emailOrnumber,
      password: hasedPassword,
      image,
    });

    const SaveData = await preSenddata.save();
    const tokenData = {
      id: SaveData._id,
      name: SaveData.name,
      emailOrnumber: SaveData.emailOrnumber,
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
  } catch (error: any) {
    return NextResponse.json({ message: "Data is not found", success: false });
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodeToken: any = Jwt.decode(token);
    const SignupData = await SignupSchema.find();
    const loggedData = await SignupSchema.findById({ _id: decodeToken.id });
    return NextResponse.json({
      message: "Data is found",
      success: true,
      SignupData,
      loggedData,
    });
  } catch (error: any) {
    return NextResponse.json({ message: "Data is not found", success: false });
  }
}
