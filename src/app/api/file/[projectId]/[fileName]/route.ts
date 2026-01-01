import { connectDB } from "@/config/connectDB";
import { FileModel } from "@/models/FileModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest,{params}:{params:Promise<{projectId:string,fileName:string}>}) {

    const {projectId,fileName}=await params;

    if(!projectId && !fileName){
        return new NextResponse(
            "ProjectId & FileName Are Required",{
                headers:{
                    'content-type':"text/html"
                }
            }
        )
    }

    // Get Extension Of File Name
    const extArray=fileName?.toString()?.split(".");
    const extension=extArray[extArray.length-1];

    try{
        await connectDB()
        const getFile= await FileModel.findOne({
            name:fileName,
            projectId
        })

        const content=getFile.content;

        if(extension==='html'){

            const host=request.headers.get('host'); //Get Domain name
            const protocol:string=host?.includes('localhost') ? 'http' : 'https'
            const DOMAIN:string=`${protocol}://${host}`
            const URL=`${DOMAIN}/api/file/${projectId}`;
            const replaceHTML= content.replace(/(src|href)=["']@(.*?)["']/g,`$1=${URL}$2`);
            return new NextResponse(
                replaceHTML,{
                    headers:{
                        'content-type':"text/html"
                    }
                }
            )

        }

        else if(extension==='css'){
            return new NextResponse(
                content,{
                    headers:{
                        'content-type':"text/css"
                    }
                }
            )
        }

        else if(extension==='js'){
            return new NextResponse(
                content,{
                    headers:{
                        'content-type':"text/javascript"
                    }
                }
            )
        }

        return new NextResponse(
            content,{
                headers:{
                    'content-type':"text/text"
                }
            }
        )
    }catch{
        return new NextResponse(
            "ProjectId & FileName Are Required",{
                headers:{
                    'content-type':"text/html"
                }
            }
        )
    }

    }
    
    
