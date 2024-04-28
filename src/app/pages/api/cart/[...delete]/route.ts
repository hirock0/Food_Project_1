import { CartSchema } from "@/lib/userSchema/schema";
import { NextRequest, NextResponse } from "next/server";
import { ConnectionDB } from "@/lib/connectionDB/dbconnection";
ConnectionDB()
export async function GET(request:NextRequest,res:any){
    try{
    const reqId = res.params.delete;
    const delId = {_id:reqId[0]}
    await CartSchema.findByIdAndDelete(delId);
    return NextResponse.json({message:"data is deleted",success:true})
    }catch(error:any){
        return NextResponse.json({message:"file is not deleted", success:false})

    }
}