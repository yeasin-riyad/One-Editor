import userModel from '@/models/User'
import { NextResponse, type NextRequest } from 'next/server'
import { generateAccessToken } from '@/lib/generatedAccessToken'
import { connectDB } from '@/config/connectDB'
import { sendEmail } from '@/config/resendEmail'
 

interface forgotPasswordRequestBody{
    email:string
}


export async function POST(request: NextRequest) {
    try{
        const host=request.headers.get('host'); //Get Domain name
        const protocol:string=host?.includes('localhost') ? 'http' : 'https'
        const DOMAIN:string=`${protocol}://${host}`
       
        const{email}:forgotPasswordRequestBody=await request.json()
       
        if(!email){
            return NextResponse.json(
                {error:"Email is Required"},
                {status:400}
            )
        }
            await connectDB();
        const existUser=await userModel.findOne({email});
        if(!existUser){
            return NextResponse.json({
                error:"User Not Found"
            },
            {
                status:400
            }
        )
        }

        const token:string=await generateAccessToken(existUser?._id.toString())

        const URL=`${DOMAIN}/reset-password?token=${token}`;

        // Sending Email
        await sendEmail({
            name:existUser.name,
            email:existUser.email,
            url:URL
        })

        return NextResponse.json({
            message:"Check Your Email."
        },
        {
            status:201
        }
    )





    }catch{
        return NextResponse.json({
            error:"Something Went Wrong",
        },{
            status:500
        })
    }
  
}