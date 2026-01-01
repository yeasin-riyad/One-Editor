import { NextResponse,NextRequest } from "next/server";
import { connectDB } from "@/config/connectDB";
import { FileModel } from "@/models/FileModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";


export async function POST(request:NextRequest){
    try{
        const session=await getServerSession(authOptions);
        if(!session){
            return NextResponse.json(
                {
                    error:"Unauthorized"
                },
                {
                    status:401
                }
            )
        }

        const {projectId,fileName}=await request.json();
        await connectDB();
        const data= await FileModel.findOne({
            name:fileName,
            projectId
        });

        return NextResponse.json({
            message:"Successfully",
            data
        },{
            status:200
        })


    }catch{
        return NextResponse.json({
            error:"Something Went Wrong"
        },
    {
        status:500
    })
    }
}

export async function PUT(request:NextRequest){
    try{
        const session= await getServerSession(authOptions);
        if(!session){
            return NextResponse.json(
                {
                    error:"Unauthorized"
                },
                {
                    status:401
                }
            )
        }

        const {content,fileId}= await request.json();
        if(!fileId){
            return NextResponse.json(
                {
                    error:"FileId is Required"
                },
                {
                    status:400
                }
            )
        }

         await FileModel.findByIdAndUpdate(fileId,{
            content

        })

        return NextResponse.json(
            {
                message:"Updated Successfully"
            },
            {
                status:200
            }
        )


    }catch{

          return NextResponse.json({
            error:"Something Went Wrong"
        },
    {
        status:500
    })

    }
}