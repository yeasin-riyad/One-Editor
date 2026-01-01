"use client";
import React, { useRef, useState } from "react";
import { useEditorContext } from "../_provider/EditorProvider";
import * as motion from "motion/react-client";
import { Resizable } from "re-resizable";
import { ExternalLink, RotateCcw, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useParams, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useSession } from "next-auth/react";

const BrowserRunCode = ({ children }: { children: React.ReactNode }) => {
  const { openBrowser, setOpenBrowser } = useEditorContext();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [drag, setDrag] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(true);
  const searchParams = useSearchParams();
  const fileName = searchParams.get("file");
  const [input, setInput] = useState<string>(`/${fileName}` || " ");
  const { projectId } = useParams();
  const session=useSession()

  const handleMouseDown = () => {
    setDrag(true);
  };
  const handleMouseUp = () => {
    setDrag(false);
  };

  const handleRefresh = () => {
    // Turn into true to false
    setRefresh((prev) => !prev);

    // Turn into false to true
    setTimeout(() => {
      setRefresh((prev) => !prev);
    }, 100);
  };
  return (
    <div ref={containerRef}>
      {children}
      {openBrowser && (
        <motion.div
          drag={drag}
          dragConstraints={containerRef}
          dragElastic={0.2}
          className="absolute right-2 top-0 z-50"
        >
          <Resizable className="min-h-56 min-w-80 pb-2 shadow-lg overflow-clip rounded-sm z-50 bg-white">
            <div
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              className="bg-primary h-7 flex items-center cursor-grab justify-end"
            >
              <X
                onClick={() => setOpenBrowser(false)}
                className="cursor-pointer"
              />
            </div>

            <div className="relative ">
              <Input
                onChange={(e) => setInput(e.target.value)}
                value={input}
                className="h-8 rounded-t-none text-slate-600 pl-9 pr-9"
                placeholder="Enter File Name"
              />
              <RotateCcw
                onClick={handleRefresh}
                size={16}
                className={cn(
                  "absolute top-2 left-2 cursor-pointer hover:text-primary ",
                  !refresh && "animate-spin"
                )}
              />

              <Link href={`/browser/${session?.data?.user?.name}/${projectId}/${input}`} target="_blank">
                     <ExternalLink size={16} className={cn("absolute top-2 right-2 hover:text-primary cursor-pointer")}/>


              </Link>

            </div>

            <div className="h-full w-full">
              {refresh && (
                <iframe
                  className="w-full h-full rounded-md"
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/api/file/${projectId}/${input}`}
                ></iframe>
              )}
            </div>
          </Resizable>
        </motion.div>
      )}
    </div>
  );
};

export default BrowserRunCode;
