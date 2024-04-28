import { NextRequest, NextResponse } from "next/server";
import { ConnectionDB } from "@/lib/connectionDB/dbconnection";
import { SignupSchema } from "@/lib/userSchema/schema";
ConnectionDB()
export async function POST(request:NextRequest){
    try{
        const reqImage = await request.json();
        const{id,image}=reqImage
        const updateImage = {image:image}
        const userId = {_id:id}
        await SignupSchema.findByIdAndUpdate(userId,updateImage)
        return NextResponse.json({message:"file is updated", success:true})
    }catch(error:any){

        return NextResponse.json({message:"file is not updated", success:false})
    }

}