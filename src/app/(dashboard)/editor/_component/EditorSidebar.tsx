'use client'
import { AxiosError } from "axios";
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import AxiosPublic from '@/lib/AxiosPublic'
import { getFileIcon } from '@/lib/getFileIcon'
import {  FilePlus } from 'lucide-react'
import Image from 'next/image'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

type TProjectFile={
    _id?:string;
    name:string;
    extension:string;
    projectId:string;
}

const EditorSidebar = () => {
    const [isOpen,setIsOpen]=useState<boolean>(false)
    const [fileName,setFileName]=useState<string>("");
    const [isLoading,setIsLoading]=useState<boolean>(false)
    const [fileList,setFileList]=useState<TProjectFile[]>([])
    const { projectId} = useParams();
    const router=useRouter();

    const handleCreateFile= async ()=>{
          const payload={
            name:fileName,
            projectId
        }
        try{
            setIsLoading(true);
            const response= await AxiosPublic.post("project-file",payload);
            if(response.status===201){
                toast.success(response.data.message);
                fetchAllFiles();
                setIsOpen(false);
            }

         } catch (error) {
          if (error instanceof AxiosError) {
            toast.error(error.response?.data?.error ?? "Something went wrong");
          } else {
            toast.error("Unknown error occurred");
          }
        }finally{
            setIsLoading(false)

        }
    }

    // Fetch All Files
    const fetchAllFiles=async ()=>{
        try{
            setIsLoading(true);
            const response= await AxiosPublic.get(`project-file?projectId=${projectId}`);
            if(response.status===200){
                setFileList(response.data.data || []);
            }

         } catch (error) {
          if (error instanceof AxiosError) {
            toast.error(error.response?.data?.error ?? "Something went wrong");
          } else {
            toast.error("Unknown error occurred");
          }
        }finally{
            setIsLoading(false);
        }
    }


    useEffect(()=>{
        fetchAllFiles()

    },[projectId])
    
  return (
    <Sidebar className='min-h-[calc(100vh-3.5rem)] top-14'>
        <SidebarHeader className='bg-primary/10 py-1 flex flex-row items-center justify-between'>
            Files
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button size={'icon'} variant={'ghost'} className='hover:cursor-pointer'>
                        <FilePlus/>
                    </Button>
                </DialogTrigger>

                <DialogContent>
                         <DialogTitle>ADD FILE</DialogTitle>
                         <Input disabled={isLoading} value={fileName} onChange={(e)=>setFileName(e.target.value)} placeholder='Enter File Name'/>
                         <Button onClick={handleCreateFile} disabled={isLoading} className='hover:cursor-pointer'>ADD FILE</Button>
                </DialogContent>

            </Dialog>
        </SidebarHeader>
        {/* Sidebar Content */}
        <SidebarContent>

            {isLoading?
            
            <div className='text-gray-400 mx-auto w-fit py-4'>Loading.....</div>:
            
            
            <div>
                {fileList?.length<1 ?
             
                 <div className='text-gray-400 mx-auto w-fit py-4'>No File</div>:
               
                <>
                <SidebarMenu className='py-4'>
                    {
                        fileList.map((file)=>{
                            return (
                                <SidebarMenuItem  key={file?._id}>
                                    <SidebarMenuButton className='cursor-pointer' onClick={()=>router.push(`/editor/${projectId}?file=${file.name}`)}>
                                        <div className="w-4 h-4">
                                            <Image src={getFileIcon(file.extension) || " "} 
                                            alt={file.name} 
                                            width={18} 
                                            height={18}/>
                                            

                                        </div>
                                        <p>{file.name}</p>

                                    </SidebarMenuButton>

                                </SidebarMenuItem>
                            )
                        })
                    }
                </SidebarMenu>

                </>}

            </div>}

        </SidebarContent>

    </Sidebar>
  )
}

export default EditorSidebar
