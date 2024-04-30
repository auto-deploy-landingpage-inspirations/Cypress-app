import { User } from '@/lib/supabase/supabase.types';
import React, { useState } from 'react'

const WorkspaceCreator = () => {

    const [permissions,setPermissions]=useState("private");
    const [title,setTilte]=useState("");
    const [collaborators,setCollaborators]=useState<User[]>([]);
  return (
    <div>WorkspaceCreator</div>
  )
}

export default WorkspaceCreator