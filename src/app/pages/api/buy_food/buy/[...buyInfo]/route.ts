import { NextResponse,NextRequest } from "next/server"
import { ConnectionDB } from "@/lib/connectionDB/dbconnection"
import { CartSchema } from "@/lib/userSchema/schema";
ConnectionDB()
export async function GET(request:NextRequest,res:any){
    try{
        const reqBuy = res.params.buyInfo;
        const foodId ={_id:reqBuy[0]}
        const findFood = await CartSchema.findById(foodId)
        return NextResponse.json({message:"food data is found",success:true,findFood})
    }catch(error:any){
        return NextResponse.json({message:"food data is not found",success:false})
    }

}