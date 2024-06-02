import { ITodoSliceState } from "@/lib/features/todo/types"

export interface FITodoSliceState extends Omit<ITodoSliceState, "status" | "id"> {
    status: ITodoSliceState["status"] | "all"
    id: "ascending" | "descending"
}
