'use client'

import { useState } from "react"
import { ITodoItemProps } from "./types"
import { EditItemForm } from "../EditItemForm/EditItemForm"


export const TodoItem = ({userType ,todoInfo ,...props} : ITodoItemProps) : JSX.Element => {
  const [editMode, setEditMode] = useState<boolean>(false)

  return (
    <li {...props}>
      <h2>Title: {todoInfo.title}</h2>
      <p>Email: {todoInfo.email}</p>
      <p>ID: {todoInfo.id}</p>
      {editMode ? <EditItemForm {...todoInfo} onSubmit={setEditMode}/> : 
      <>
        <p>status: {todoInfo.status}</p>
        <p>description: {todoInfo.description}</p>
      </>
      }


      {userType === 'admin' && !editMode ? <button type='button' onClick={()=>setEditMode((prevState)=>!prevState)}>Edit</button> : null}
    </li>
  )
}