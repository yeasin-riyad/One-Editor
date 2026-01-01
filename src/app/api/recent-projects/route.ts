import { connectDB } from "@/config/connectDB";
import { authOptions } from "@/lib/authOptions";
import { ProjectModel } from "@/models/ProjectModel";
import { getServerSession } from "next-auth";
import {  NextResponse } from "next/server";

export async function GET() {
    try{
        const session=await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({
                error:"Unauthorized Access"
            },{status:401})
        }
        await connectDB();
        const recentProjects= await ProjectModel.find({
            userId:session.user.id
        }).sort({updatedAt:-1}).limit(10);

       return  NextResponse.json({
            message:"Recent Projects",
            data:recentProjects
        },{status:201})

    }catch(error){
            return NextResponse.json({
                error:"Internel server Error"
            },{status:500})
        }
    
}