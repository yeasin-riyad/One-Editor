'use client'
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
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
  

  interface TProjectType{
    buttonVariant?:"outline" | "default"
  }
const CreateProject = ({buttonVariant}:TProjectType) => {
    const [projectName,setProjectName]=useState<string>("")
    const [loading,setLoading]=useState<boolean>(false);
    const router=useRouter();
    const [isOpen,setIsOpen]=useState<boolean>(false);


    const handleCreateProject =async(e:any)=>{
        e.preventDefault()
        if(!projectName){
          return toast.error("Project Name is require")
        }
        try{
          setLoading(true)

          const response= await AxiosPublic.post('project',{
            name:projectName
          })

          if(response.status===201){
            toast.success(response.data.message);
            router.push(`/editor/${response?.data?.data?._id}?file=index.html`)
            setProjectName("");
            setIsOpen(false);
          }

        }catch(error){
            if (axios.isAxiosError(error)) {
    toast.error(error.response?.data?.error || "Something went wrong");
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
    <Button variant={buttonVariant ?? 'outline'} className='cursor-pointer  mx-2 '>
        Create Project
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create A Project :-</DialogTitle>
      <form className="my-4">
      <Input disabled={loading} value={projectName ?? ""} onChange={(e)=>setProjectName(e.target.value as string)} placeholder="Enter Your Project Name"/>
      </form>
      <Button disabled={loading} onClick={handleCreateProject}  className="cursor-pointer">{loading?"Creating..":"Create Project"}</Button>
    </DialogHeader>

  </DialogContent>
</Dialog>

  )
}

export default CreateProject
