import { NextResponse,NextRequest } from "next/server";
import { connectDB } from "@/config/connectDB";
import { ProjectModel } from "@/models/ProjectModel";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { FileModel } from "@/models/FileModel";
import { htmlBoilerPlateCode, scriptBoilerPlateCode, styleBoilerPlateCode } from "@/lib/sampleCode";

// Create Project
export async function POST(request:NextRequest) {
    try{

        // Verify Authentic User
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({
                error:"Unauthorized Access"
            },{status:401})

        }

            // Destructure Request Body
        const {name}=await request.json();
        if(!name){
            return NextResponse.json({
                error:"Project Name Is Required"
            },{status:400})
        }

        await connectDB();


        // Create a New project
        const project =await ProjectModel.create({
            name,
            userId:session.user.id
        })

        // After creating a project create 3 files. index.html,style.css,script.js


        // create index.html
         await FileModel.create({
            name:"index.html",
            projectId: project._id,
            content:htmlBoilerPlateCode
        })

        // create style.css
        await FileModel.create({
            name:"style.css",
            projectId: project._id,
            content:styleBoilerPlateCode
        })

        // create script.js
        await FileModel.create({
            name:"script.js",
            projectId: project._id,
            content:scriptBoilerPlateCode
        })

        return NextResponse.json({
            message:"Project Created Successfully",
            data:project
        },{status:201})


    }catch(error){
        return NextResponse.json({
            error:"Internel server Error"
        },{status:500})
    }
    
}


// Get All User Projects with userId
export async function GET(request:NextRequest){
    try{

        const session=await getServerSession(authOptions);
        if(!session){
           return NextResponse.json({
            error:"Unauthorized Access"
           },{status:401})
        }

        
        const searchParams= request.nextUrl.searchParams;
         // Por Specific project with Project Id
         const projectId=searchParams.get('projectId');
         const filterProject={
             userId:session.user.id,
             ...(projectId && {_id:projectId,})
 
 
         }
        const page=Number(searchParams.get('page'))|| 1;
        const limit=Number(searchParams.get('limit')) ||6;
        const skip= (page-1)*limit;
        const projectList= await ProjectModel.find(filterProject).sort({createdAt:-1}).skip(skip).limit(limit);

        const totalCount= await ProjectModel.countDocuments(filterProject);
        const totalPages= Math.ceil(totalCount/limit);

        return NextResponse.json({
            message:"Project list",
            data:projectList,
            totalPages,
            totalCount

        },{status:201})

    }catch(error){
        return NextResponse.json({
            error: "Internel server Error"
        },{status:500})
    }
}

// Update A Project 
export async function PUT(request:NextRequest) {
    try{
          // Verify Authentic User
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({
                error:"Unauthorized Access"
            },{status:401})

        }

         // Destructure Request Body
        const {name,projectId}=await request.json();
         if(!name || !projectId){
            return NextResponse.json({
                error:"Project Name Is Required"
            },{status:400})
        }

        await connectDB();
         await ProjectModel.findByIdAndUpdate(projectId,{
            name
        })
       return NextResponse.json({
            message:"Project Updated Successfully"
        },{status:200})

    }catch(error){
        return NextResponse.json({
            error: "Internel server Error"
        },{status:500})

    }
    
}