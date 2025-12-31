import {withAuth} from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
    function middleware(req){
        const token=req.nextauth.token;
        // console.log("Token---",token);

        // if the user is logged in and tries to access the login and register page
        if(token && (
            req.nextUrl.pathname==='/login'||
            req.nextUrl.pathname==='/register' ||
            req.nextUrl.pathname==='/forgot-password'
        )){
            return NextResponse.redirect(new URL("/dashboard",req.url))

        }
        return NextResponse.next()
    },
    {
        callbacks:{
            authorized:({token,req})=>{
                const {pathname}=req.nextUrl;
                if(pathname==='/login' || pathname==='/register' || pathname=='/forgot-password'){
                    return true
                }
                return !!token
            },
        },
      
    }
)

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/register','/forgot-password','/editor/:path*'],
  };