import { connectDB } from "@/config/connectDB";
import userModel from "@/models/User";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {
    try{
        const{password,userId}=await request.json();
        if(!password && !userId){
            return NextResponse.json({
                error:"Please Provide UserId and Password"
            },{status:400})
        }
                const hashedPassword=await bcrypt.hash(password,10);
        

        await connectDB();
         await userModel.findByIdAndUpdate(userId,{password:hashedPassword})
         return NextResponse.json({
            message:"Password Updated Successfully."
         },{status:201})
        


    }catch{
                return NextResponse.json({
                    error:"Something Went Wrong"
                },{
                    status:500
                })
            }


}