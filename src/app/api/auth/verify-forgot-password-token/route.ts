import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken'

interface TokenPayload {
    id: string; 
    iat?: number;
    exp?: number;
  }
  
export async function POST(request:NextRequest) {
    try{
        const {token}=await request.json()
        if(!token){
            return NextResponse.json({
                error:"Token Is Required."
            },{status:400})
        }
        if (!process.env.FORGOT_PASSWORD_SECRET) {
            return NextResponse.json({
                error:"FORGOT_PASSWORD_SECRET is not defined in environment variables"
            },{status:400})
          }


        const decode= jwt.verify(token,process.env.FORGOT_PASSWORD_SECRET )as TokenPayload;
        if(!decode){
            return NextResponse.json({
                error:"Token Was Expire.",
                expired:true
            },{status:400})
        }

        return NextResponse.json({
            message:"Token Is Valid",
            expired:false,
            userId:decode?.id || null 
        },{
            status:201
        })



    }catch{
            return NextResponse.json({
                error:"Something Went Wrong"
            },{
                status:500
            })
        }
      
    
}