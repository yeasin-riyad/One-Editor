'use client'
import { AxiosError } from "axios";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import AxiosPublic from "@/lib/AxiosPublic"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
  

 interface TUpdateProject{
    projectId:string,
    name:string,
    fetchData:()=>void,
 }
const UpdateProject = ({projectId,name,fetchData}:TUpdateProject) => {
    const [projectName,setProjectName]=useState<string>(name)
    const [loading,setLoading]=useState<boolean>(false);
    const [isOpen,setIsOpen]=useState<boolean>(false);


    const updateProject =async(e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        if(!projectName){
          return toast.error("Project Name is require")
        }
        try{
          setLoading(true)

          const response= await AxiosPublic.put('project',{
            name:projectName,
            projectId
          })

          if(response.status===200){
            toast.success(response.data.message);
            fetchData();
            setIsOpen(false);
          }

         } catch (error) {
          if (error instanceof AxiosError) {
            toast.error(error.response?.data?.error ?? "Something went wrong");
          } else {
            toast.error("Unknown error occurred");
          }
        }finally{
          setLoading(false)
        }

    }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
  <DialogTrigger asChild>
    <Button size={'icon'} variant={'ghost'} className="invisible group-hover:visible cursor-pointer"><Pencil/></Button>

                </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Edit Project :-</DialogTitle>
      <form className="my-4">
      <Input disabled={loading} value={projectName ?? ""} onChange={(e)=>setProjectName(e.target.value as string)} placeholder="Enter Your Project Name"/>
      </form>
      <Button disabled={loading} onClick={updateProject}  className="cursor-pointer">{loading?"Updating..":"Update Project"}</Button>
    </DialogHeader>

  </DialogContent>
</Dialog>

  )
}

export default UpdateProject;
