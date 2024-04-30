import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import React from 'react'
import { cookies } from 'next/headers'
import { getCollaboratingWorkspaces, getFolders, getPrivateWorkspaces, getSharedWorkspaces, getUserSubscriptionStatus } from '@/lib/supabase/queries'
import { redirect } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import WorkspaceDropDown from './workspace-dropdown'

interface SidebarProps{
     params:{workspaceId:string},
     className?:string
}

const Sidebar = async({params,className}:SidebarProps) => {

    const supabase=createServerComponentClient({cookies});

    const {data:{user}}=await supabase.auth.getUser();

    if(!user) return;

    const {data:subscription,error:subscriptionError}=await getUserSubscriptionStatus(user.id);
    
    const {data:workspaceFolder,error:folderError}=await getFolders(params.workspaceId);

    if(subscriptionError || folderError) redirect("/dashboard");

    const [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces] =
    await Promise.all([
      getPrivateWorkspaces(user.id),
      getCollaboratingWorkspaces(user.id),
      getSharedWorkspaces(user.id),
    ]);


    
    


  return (
    <aside className={twMerge(
      'hidden sm:flex sm:flex-col w-[280px] shrink-0 p-4 md:gap-4 !justify-between  ',className
    )}>
      <div>
        <WorkspaceDropDown privateWorkspaces={privateWorkspaces} collaboratingWorkspaces={collaboratingWorkspaces} sharedWorkspaces={sharedWorkspaces} defaultValue={[
          ...privateWorkspaces,
          ...collaboratingWorkspaces,
          ...sharedWorkspaces
        ].find((workspace)=>workspace.id===params.workspaceId)
        } />
      </div>

    </aside>
  )
}

export default Sidebar