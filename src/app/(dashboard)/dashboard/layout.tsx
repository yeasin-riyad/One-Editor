import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import DashboardSidebar from './_component/DashboardSidebar'
import DashboardHeader from './_component/DashboardHeader'


const DashboardLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <SidebarProvider>
        {/* Sidebar left side */}
        <DashboardSidebar/>

    {/* Right Side */}
        <main className='bg-gray-100 w-full'>
          <DashboardHeader/>
            
            {children}
        </main>
        
    </SidebarProvider>
  )
}

export default DashboardLayout
