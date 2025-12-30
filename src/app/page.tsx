'use client'
import Logo from "@/components/Logo";
import TextAnimationHeading from "@/components/TextAnimationHeading";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router=useRouter();
  return (
    <div className="container   min-h-screen bg-gradient-to-b via-white from-white to-primary overflow-hidden">
      <header className="h-20 px-4 py-3">
        <div className="flex items-center justify-between gap-4">
        <Logo/>
        <nav>
          <Button className="cursor-pointer" onClick={()=>router.push("/login")}>Login</Button>
        </nav>
        </div>

      </header>


      {/* Text */}
      <TextAnimationHeading/>

      {/* Dashboard Landing Image */}
      <div className="flex items-center justify-center shadow-md">
        <Image src={"/banner-animate.gif"} alt="Banner" width={1000} height={400}/>
      </div>

      {/* Footer */}
      <footer className="flex justify-center items-center bg-black py-4 mt-2 text-neutral-200 ">
        <p className="text-base font-semibold">Made By <span className="text-primary">Yeasin Riyad</span></p>
      </footer>
    </div>
  );
}
