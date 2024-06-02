'use client'

import { Pagination } from 'antd';
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { filterArr } from './utils/fulterArr';
import { AddTodoForm } from './addTodoForm/AddTodoForm';
import { FITodoSliceState } from './types';
import { TodoItem } from './TodoItem/TodoItem';

export const HomePage = () : JSX.Element=> {
  const [ currentBunch, setCurrentBunch ] = useState<number>(1);

  const initialInputsValue : FITodoSliceState = {
    description : '',
    email : '',
    id : '',
    status : 'all',
    title : ''
  }

  const [values , setValues] = useState<FITodoSliceState>(initialInputsValue);
  const todos = useAppSelector((state)=>state.todoSlice)
  
  const session = useSession();
  const status = session.status;
  const router = useRouter();

  useEffect(()=>{
    setCurrentBunch(1)
  }, [values])

  useLayoutEffect(()=>{
    if (status ==='unauthenticated') router.push('/sign-in') 
  }, [])
    const limit = 3;
    const filteredArr = filterArr(values, todos)
    const shownTodos = [...filteredArr].slice((currentBunch -1 )*limit, currentBunch * limit);

    console.log(session);

    const renderContent = (userType: 'user' | 'admin') : JSX.Element => (
      <>
        <Link href='/sign-in' >to sign in</Link>
        <Link href='/sign-out' >to sign out</Link>
        <label htmlFor="id">
          id : <input type="text" name='id' value={values.id} onChange={(e)=>setValues((prevState)=>({...prevState, id : e.target.value}))}/>
        </label>
        <label htmlFor="title">
          title : <input type="text" name='title' value={values.title} onChange={(e)=>setValues((prevState)=>({...prevState, title : e.target.value}))}/>
        </label>
        <label htmlFor="email">
          email : <input type="text" name='email' value={values.email} onChange={(e)=>setValues((prevState)=>({...prevState, email : e.target.value}))}/>
        </label>
        <label htmlFor="description">
          descriptiom : <input type="text" name='description' value={values.description} onChange={(e)=>setValues((prevState)=>({...prevState, description : e.target.value}))}/>
        </label>
        <label htmlFor="status">
          in progress: <input type="radio" name='status' onChange={()=>setValues((prevState)=>({...prevState, status : 'in progress'}))}/>
          completed : <input type="radio" name='status' onChange={()=>setValues((prevState)=>({...prevState, status : 'completed'}))}/>
          all :  <input type="radio" name='status' defaultChecked onChange={()=>setValues((prevState)=>({...prevState, status : 'all'}))}/>
        </label>

        <ul>
          {shownTodos.map((item)=> (
          <TodoItem userType={userType} todoInfo={item} key={item.id} style={{border: '1px solid black'}} />
          ) )}
        </ul>
        
        <AddTodoForm/>
        
        <Pagination defaultCurrent={currentBunch} total={filteredArr.length} defaultPageSize={3} onChange={(e)=>setCurrentBunch(e)}/>
      </>
    )
    
    
   return (renderContent(session.data?.user.type as 'user' | 'admin')  
  )
}