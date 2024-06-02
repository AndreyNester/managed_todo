import { ITodoSliceState } from "@/lib/features/counter/types";
import { Dispatch, SetStateAction } from "react";

export interface IEditFTodoCredentials extends Pick<ITodoSliceState, 'description' | 'status'> {}
export interface IEditItemFormProps extends ITodoSliceState {
  onSubmit : Dispatch<SetStateAction<boolean>>
}