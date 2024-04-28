import { NextRequest, NextResponse } from "next/server";
import { ConnectionDB } from "@/lib/connectionDB/dbconnection";
import { FoodOrderSchema } from "@/lib/userSchema/schema";
ConnectionDB()
export async function POST(request:NextRequest){
    try{
        const reqBuy = await request.json()
        const{
            image,
            price,
            foodname,
            contact,
            address,
            emailOrnumber,
            date
        }=reqBuy
        const preSaveFood = await new FoodOrderSchema({
            image,
            price,
            foodname,
            contact,
            address,
            emailOrnumber,
            date
        })
        const SaveData = await preSaveFood.save()
        return NextResponse.json({message:"buy successfull",success:true,reqBuy})
    }catch(error:any){
        return NextResponse.json({message:"buy not successfull",success:false})
    }

}
export async function GET(){
    try{ 
    const buydata = await FoodOrderSchema.find().sort({dateField:-1})
    return NextResponse.json({message:"Buy data is found" ,success:true,buydata})
}catch(error:any){
    return NextResponse.json({message:"Buy data is not found" ,success:false})
}
}

