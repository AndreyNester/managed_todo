'use client'

import { useState } from "react"
import { ITodoItemProps } from "./types"
import { EditItemForm } from "../../../../lib/features/forms/EditItemForm/EditItemForm"
import { Button, Card } from "antd"


export const TodoItem = ({userType ,todoInfo ,...props} : ITodoItemProps) : JSX.Element => {
  const [editMode, setEditMode] = useState<boolean>(false)

  const renderRestContent = () : JSX.Element => {
    return (
      <>
        <p>status: {todoInfo.status}</p>
        <p>description: {todoInfo.description}</p>
      </>
    )
  }

  return (
    <li {...props}>
      <Card title={todoInfo.title} bordered={false} style={{ width: '100%' }}>
        <p>Email: {todoInfo.email}</p>
        <p>ID: {todoInfo.id}</p>
        {editMode ? <EditItemForm {...todoInfo} onSubmit={setEditMode}/> : renderRestContent()}
        {userType === 'admin' && !editMode ? <Button onClick={()=>setEditMode((prevState)=>!prevState)}>Edit</Button> : null}
      </Card>
    </li>
  )
}