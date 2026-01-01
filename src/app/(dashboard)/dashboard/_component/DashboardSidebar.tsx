'use client'
import { AxiosError } from "axios";
import Logo from '@/components/Logo'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from '@/components/ui/sidebar'
import { getAvatarName } from '@/lib/getAvatarName'
import { cn } from '@/lib/utils'
import { FileIcon } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import CreateProject from './CreateProject'
import AxiosPublic from '@/lib/AxiosPublic'
import { toast } from 'sonner'

interface ProjectItem {
  _id: string;
  name: string;
}

const DashboardSidebar = () => {
    const pathname=usePathname()
    const session=useSession()
const [recentProjectsUpdate, setRecentProjectsUpdate] =
  useState<ProjectItem[]>([]);
    const [,setIsLoading]=useState(true)

  
  

    const recentProjects=async()=>{
      try{

        const response= await AxiosPublic.get('recent-projects');
        // console.log(response,"Response.......")
      if(response.status===201){
        setRecentProjectsUpdate(response.data.data as ProjectItem[]);


      }

      } catch (e) {
  if (e instanceof AxiosError) {
    toast.error(e.response?.data?.error ?? "Something went wrong");
  } else {
    toast.error("Unknown error occurred");
  }
}finally{
        setIsLoading(false)
      }

    }

    useEffect(()=>{
      recentProjects()

    },[])
  return (
    <Sidebar className='overflow-hidden'>
        <SidebarHeader className='px-4'>
            <Logo w={100}/>
        </SidebarHeader>
        <SidebarSeparator/>
        <SidebarContent>

          {/* First Group */}
            <SidebarGroup>
            <CreateProject/>
            </SidebarGroup>

      {/* Second Group */}
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton asChild>
                                <Link className={cn("",pathname==="/dashboard" && "bg-primary")}  href={"/dashboard"}>
                                    Dashboard
                                </Link>

                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>

        {/* Third Group */}
            <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {recentProjectsUpdate.map((item) => (
                <SidebarMenuItem key={item._id}>
                  <SidebarMenuButton asChild>
                    <Link href={`${process.env.NEXT_PUBLIC_BASE_URL}/editor/${item?._id}/?file=index.html`}>
                    <FileIcon/>
                     
                     {item.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        </SidebarContent>

         {/* Sidebar Footer */}
         <SidebarFooter className='bg-primary/10 rounded drop-shadow-lg md:hidden'>
        <Popover>
          <PopoverTrigger>
            <Avatar className="w-10 h-10 drop-shadow-accent cursor-pointer ml-auto">
              <AvatarImage
                src={session?.data?.user?.image as string}
                alt="@shadcn"
              />
              <AvatarFallback>
                {getAvatarName(session?.data?.user?.name as string)}
              </AvatarFallback>
            </Avatar>
          </PopoverTrigger>
          <PopoverContent>
            <p className="semi-bold py-2">{session?.data?.user?.name}</p>
            <div className="p-[0.5px] bg-gray-200"></div>
            <Button onClick={()=>signOut({callbackUrl:"/login"})} variant={"destructive"} className="w-full my-2 cursor-pointer">Logout</Button>
          </PopoverContent>
        </Popover>
        </SidebarFooter>
    </Sidebar>
  )
}

export default DashboardSidebar
