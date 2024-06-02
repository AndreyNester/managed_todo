import { ITodoSliceState } from "@/lib/features/todo/types";
import { FITodoSliceState } from "../types";

export const proccessArr = (values : FITodoSliceState, data : ITodoSliceState[]) : ITodoSliceState[] => {
  const {description, email, id, status, title} = values;
  let newArr = [...data];
  
  if (description) newArr = newArr.filter((item)=>description === item.description.slice(0, description.length))
  if (title) newArr = newArr.filter((item)=>title === item.title.slice(0, title.length))
  if (email) newArr = newArr.filter((item)=>email === item.email.slice(0, email.length))
  if (status !== 'all') newArr = newArr.filter((item)=>status === item.status)
  if (id === 'ascending') newArr.sort((a,b)=> Number(a.id) - Number(b.id) ) 
  else newArr.sort((a,b)=>Number(b.id) - Number(a.id))
  return newArr; 
}