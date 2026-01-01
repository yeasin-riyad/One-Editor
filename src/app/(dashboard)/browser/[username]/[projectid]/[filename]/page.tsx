'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const BrowserPage = () => {
    const {projectid,filename}=useParams();
  return (
     <iframe
                  className="w-full h-full min-h-screen min-w-screen"
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/file/${projectid}/${filename}`}
                ></iframe>
  )
}

export default BrowserPage
