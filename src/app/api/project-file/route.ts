import { NextRequest,NextResponse } from "next/server";
import { connectDB } from "@/config/connectDB";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { FileModel } from "@/models/FileModel";


// Create A Project
export async function POST(request:NextRequest) {
    try{
        const session=await getServerSession(authOptions)
        if(!session){
            return NextResponse.json(
                {error:"Unauthorized Access"},
                {status:401}
            )
        }

        const {name,projectId}=await request.json();
        if(!name || !projectId){
            return NextResponse.json(
                {error:"Name And ProjectId is Required"},
                {status:400}
            )
        }
        await connectDB()
        const checkFileName=await FileModel.findOne({name,projectId});
        if(checkFileName){
            return NextResponse.json(
                {error:"File Name Is Already Exist"},
                {status:400}
            )
        }

        const createFile= await FileModel.create({name,projectId})
        if(createFile){
            return NextResponse.json(
                {message:"File Created Successfully"},
                {status:201}
            )
        }

    }catch{
        return NextResponse.json(
            {error:"Something Went Wrong"},
            {status:500}
        )
    }
    
}

// Get File with Project Id
export async function GET(request:NextRequest) {
    try{
         const session=await getServerSession(authOptions)
        if(!session){
            return NextResponse.json(
                {error:"Unauthorized Access"},
                {status:401}
            )
        }
        const searchParams= request.nextUrl.searchParams;
        const projectId= searchParams.get("projectId");
        if(!projectId){
            return NextResponse.json(
                {error:"Project Id is Required"},
                {status:404}
            )
        }
        await connectDB();
        const allFiles= await FileModel.find({projectId}).select("-content");
        return NextResponse.json(
            {message:"All files with respect to project",data:allFiles},
            {status:200}
            
        )
    }catch{
        return NextResponse.json(
            {error:"Something Went Wrong"},
            {status:500}
        )
    }
    
}