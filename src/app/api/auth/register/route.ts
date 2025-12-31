import {type NextRequest,NextResponse } from "next/server";
import userModel from "@/models/User";
import { connectDB } from "@/config/connectDB";

export async function POST(request:NextRequest) {
    try{

     
        const {name,email,password}=await request.json();
        if(!name || !email || !password){
            return NextResponse.json({
                error:"Name,Email and Password is Required."
            })
        }
        await connectDB();
        const existUser= await userModel.findOne({email});
        if(existUser){
            return NextResponse.json({
                error:"User Already Exist."
            },
            {
                status:400
            }
        )
        }

        await userModel.create({
            name,
            email,
            password
        })

        return NextResponse.json(
            {message:"User Registered Successfully."},
            {status:201}
        )

    }catch{
       
        return NextResponse.json({
            error:"Failed To Register User"
        },{
            status:500
        })

    }
}