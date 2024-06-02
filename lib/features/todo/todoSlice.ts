import { createAppSlice } from "@/lib/createAppSlice"
import type { PayloadAction } from "@reduxjs/toolkit"
import { dataBase } from "./constants"
import { IaddFTodoCredentials, IeditFTodoCredentials, ITodoSliceState } from "./types"

const initialTodoState: ITodoSliceState[] = dataBase

export const todoSlice = createAppSlice({
    name: "todoSlice",
    initialState: initialTodoState,
    reducers: (create) => ({
        addTodo: create.reducer((prevState, action: PayloadAction<IaddFTodoCredentials>) => {
            prevState[prevState.length] = {
                ...action.payload,
                id: prevState.length + 1,
                status: "in progress",
            }
        }),
        editTodo: create.reducer((prevState, action: PayloadAction<IeditFTodoCredentials>) => {
            const gidx = prevState.findIndex((item) => item.id === action.payload.id)
            prevState[gidx] = action.payload
        }),
    }),
})

export const { addTodo, editTodo } = todoSlice.actions
