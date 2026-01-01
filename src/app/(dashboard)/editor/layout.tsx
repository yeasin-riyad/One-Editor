"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import EditorHeader from "./_component/EditorHeader";
import EditorSidebar from "./_component/EditorSidebar";
import FileOpen from "./_component/FileOpen";
import { EditorProviderComponent } from "./_provider/EditorProvider";
import BrowserRunCode from "./_component/BrowserRunCode";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <EditorProviderComponent>
        <EditorHeader />
        <div className="relative">
          <BrowserRunCode>
            <SidebarProvider>
              {/* Editor Sidebar Left Side */}
              <EditorSidebar />

              {/* Editor and file Open */}

              <main className="bg-gray-100 w-full">
                <FileOpen />
                {children}
              </main>
            </SidebarProvider>
          </BrowserRunCode>
        </div>
      </EditorProviderComponent>
    </div>
  );
}
