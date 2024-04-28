import { CartSchema } from "@/lib/userSchema/schema";
import { NextRequest, NextResponse } from "next/server";
import { ConnectionDB } from "@/lib/connectionDB/dbconnection";
ConnectionDB()
export async function POST(request:NextRequest){
    try{
        
    const reqCart = await request.json()
    const{
        foodName,
        emailOrnumber,
        image,
        price,
        date
    }=reqCart;
    const preSendData = await new CartSchema({
        foodName,
        emailOrnumber,
        image,
        price,
        date
    })
     await preSendData.save()
    return NextResponse.json({mesage:"cart data is found",success:true})
}catch(error:any){
    return NextResponse.json({mesage:"cart data is not found",success:false})
}
}

export async function GET(){
    try{
        const allCartsDetails = await CartSchema.find()
        return NextResponse.json({mesage:"cart data is found",success:true,allCartsDetails})
    }catch(error:any){
        return NextResponse.json({mesage:"cart data is not found",success:false})
    }
   
}