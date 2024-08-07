"use client"

import { Pagination, Radio, Space } from "antd"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useLayoutEffect, useState } from "react"
import { useAppSelector } from "@/lib/hooks"
import { proccessArr } from "./utils/proccessArr"
import { AddTodoForm } from "../../../lib/features/forms/addTodoForm/AddTodoForm"
import { FITodoSliceState } from "./types"
import { TodoItem } from "./TodoItem/TodoItem"
import styles from "./HomePage.module.css"

export const HomePage = (): JSX.Element => {
    const [currentBunch, setCurrentBunch] = useState<number>(1)

    const initialInputsValue: FITodoSliceState = {
        description: "",
        email: "",
        id: "ascending",
        status: "all",
        title: "",
    }

    const [values, setValues] = useState<FITodoSliceState>(initialInputsValue)
    const todos = useAppSelector((state) => state.todoSlice)

    const session = useSession()
    const status = session.status
    const router = useRouter()

    useEffect(() => {
        setCurrentBunch(1)
    }, [values])

    useLayoutEffect(() => {
        if (status === "unauthenticated") router.push("/sign-in")
    })
    const limit = 3
    const proccessedArr = proccessArr(values, todos)
    const shownTodos = [...proccessedArr].slice((currentBunch - 1) * limit, currentBunch * limit)

    const renderContent = (userType: "user" | "admin"): JSX.Element => (
        <>
            <div className={styles.filtersList}>
                <h3>Filters</h3>
                <h4>ID</h4>
                <Radio.Group
                    id='id'
                    name='id'
                    defaultValue={"ascending"}
                    onChange={(e) => setValues((prevState) => ({ ...prevState, id: e.target.value }))}
                    className={styles.radioGroup}>
                    <Space direction='vertical'>
                        <Radio value={"ascending"}>Ascending</Radio>
                        <Radio value={"descending"}>Descending</Radio>
                    </Space>
                </Radio.Group>

                <label htmlFor='title' className='block text-sm font-medium leading-6 text-gray-900'>
                    <h4>title</h4>
                    <input
                        id='title'
                        type='text'
                        name='title'
                        value={values.title}
                        onChange={(e) => setValues((prevState) => ({ ...prevState, title: e.target.value }))}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                </label>
                <label htmlFor='email' className='block text-sm font-medium leading-6 text-gray-900'>
                    <h4>email</h4>
                    <input
                        id='email'
                        type='text'
                        name='email'
                        value={values.email}
                        onChange={(e) => setValues((prevState) => ({ ...prevState, email: e.target.value }))}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                </label>
                <label htmlFor='description' className='block text-sm font-medium leading-6 text-gray-900'>
                    <h4>descriptiom</h4>
                    <input
                        id='description'
                        type='text'
                        name='description'
                        value={values.description}
                        onChange={(e) => setValues((prevState) => ({ ...prevState, description: e.target.value }))}
                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    />
                </label>
                <h4>Status</h4>
                <Radio.Group
                    defaultValue={"all"}
                    onChange={(e) => setValues((prevState) => ({ ...prevState, status: e.target.value }))}
                    className={styles.radioGroup}>
                    <Space direction='vertical'>
                        <Radio value={"in progress"}>In progress</Radio>
                        <Radio value={"completed"}>Completed</Radio>
                        <Radio value={"all"}>All</Radio>
                    </Space>
                </Radio.Group>
            </div>

            <div className={styles.todoList}>
                <h2>Todos</h2>
                <ul>
                    {shownTodos.map((item) => (
                        <TodoItem userType={userType} todoInfo={item} key={item.id} className={styles.todoItem} />
                    ))}
                </ul>
            </div>

            <AddTodoForm />

            <Pagination
                simple
                defaultCurrent={currentBunch}
                total={proccessedArr.length}
                defaultPageSize={3}
                onChange={(e) => setCurrentBunch(e)}
                className={styles.pagination}
            />
        </>
    )

    return renderContent(session.data?.user.type as "user" | "admin")
}
