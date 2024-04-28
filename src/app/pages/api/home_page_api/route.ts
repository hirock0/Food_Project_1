import { HomeApi } from "@/api_data/home_page_api/home_api";
import { NextResponse } from "next/server";
export async function GET() {
  try {
    const HomePageAllData = HomeApi;
    return NextResponse.json({
      message: "Data is founded",
      success: true,
      HomePageAllData,
    });
  } catch (error: any) {
    return NextResponse.json({
      message: "Data is not founded",
      success: false,
    });
  }
}
