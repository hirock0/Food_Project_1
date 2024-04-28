import { NextResponse } from "next/server";
import { ConnectionDB } from "@/lib/connectionDB/dbconnection";
ConnectionDB();
export async function GET() {
  try {
    const response = NextResponse.json({
      message: "Logout successfully",
      success: true,
    });
    response.cookies.delete("token");
    return response;
  } catch (error: any) {
    return NextResponse.json({
      message: "Logout not successfull",
      success: false,
    });
  }
}
