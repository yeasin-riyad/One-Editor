'use client'
import { AxiosError } from "axios";
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'
import {basicSetup,EditorView} from 'codemirror'
import { EditorState } from '@codemirror/state';
import {html} from '@codemirror/lang-html';
import {javascript,javascriptLanguage} from '@codemirror/lang-javascript'
import {css,cssLanguage} from '@codemirror/lang-css';
import AxiosPublic from '@/lib/AxiosPublic';
import { toast } from 'sonner';
import { useEditorContext } from '../_provider/EditorProvider';



const Editor = () => {
  const searchParams=useSearchParams();
  const file=searchParams.get('file');
 const [element,setElement]=useState<HTMLElement | null>(null);
 const {projectId}=useParams();
 const [content,setContent]=useState<string>("");
 const [fileId,setFileId]=useState<string>("");
 const {setIsLoading}=useEditorContext()

 const ref=useCallback((node: HTMLElement | null)=>{
  if(!node) return;
  setElement(node);

 },[])

 const fetchData= async()=>{
  const payload={
    projectId,
    fileName:file
  }
  try{
    const response= await AxiosPublic.post('code',payload);
    if(response.status===200){
      setContent(response?.data?.data?.content);
      setFileId(response?.data?.data?._id);
    }

  } catch (error) {
  if (error instanceof AxiosError) {
    toast.error(error.response?.data?.error ?? "Something went wrong");
  } else {
    toast.error("Unknown error occurred");
  }
}
 }

 const updateData= async(fileContent:string)=>{
  const payload={
    fileId,
    content:fileContent
  }
  try{
    setIsLoading(true);
    const response= await AxiosPublic.put('code',payload);
    if(response.status===200){
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

// Split File Extension
const extensionArray= file?.split(".") || [];
const extension= extensionArray[extensionArray?.length-1];

 useEffect(()=>{
      fetchData();
  
 },[file,projectId])

 useEffect(()=>{
  if(!element) return;

  const state= EditorState.create({
    doc:content,
    extensions:[
      basicSetup,
      // html, css ,javascript

      EditorView.updateListener.of((update)=>{
        if(update.docChanged){
          if(update.docChanged){

            // after 1 sec the changes will update in database
            setTimeout(()=>{
              updateData(update?.state?.doc?.toString())

            },1000)
            

          }
        }
      }),

      extension ==='js' ? javascript() : extension==='css'?css():html({
        autoCloseTags:true,
        selfClosingTags:true,
        nestedLanguages:[
          {
            tag:"style",
            parser:cssLanguage.parser
          },
          {
            tag:"script",
            parser:javascriptLanguage.parser
          }

        ]
      })

    ]
  })

   const view=new EditorView({
  state,
  parent:element
 })

  return ()=>{
    view.destroy();
  }
 },[file,element,content])



  return (
    <div className='p-2 pb-10'>
       {
        !file ? (
          <div className='flex items-center justify-center flex-col p-4 pb-7 bg-white rounded-md'>
            <Image src={"/editor file.svg"} width={320} height={320} alt='editor'/>
            <p className='text-slate-400'>No File Is Open</p>
          </div>

        ):(
          <div className='relative flex-1 h-full min-h-[calc(100vh-3.5rem)] bg-white w-full overflow-auto' ref={ref}></div>

        )
       }
      
    </div>
  )
}

export default Editor
