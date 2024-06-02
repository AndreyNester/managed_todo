import { ITodoSliceState } from "@/lib/features/counter/types";
import { DetailedHTMLProps, LiHTMLAttributes } from "react";


export interface ITodoItemProps extends DetailedHTMLProps<LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
  userType : 'user' | 'admin',
  todoInfo : ITodoSliceState
}