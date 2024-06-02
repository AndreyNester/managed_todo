import { ITodoSliceState } from "@/lib/features/counter/types";
import { FITodoSliceState } from "../types";

export const filterArr = (values : FITodoSliceState, data : ITodoSliceState[]) : ITodoSliceState[] => {
  const {description, email, id, status, title} = values;
  let newArr = [...data];
  
  if (description) newArr = newArr.filter((item)=>description === item.description.slice(0, description.length))
  if (id) newArr = newArr.filter((item)=>id === String(item.id).slice(0, String(id).length))
  if (title) newArr = newArr.filter((item)=>title === item.title.slice(0, title.length))
  if (email) newArr = newArr.filter((item)=>email === item.email.slice(0, email.length))
  if (status !== 'all') newArr = newArr.filter((item)=>status === item.status)

  return newArr; 
}