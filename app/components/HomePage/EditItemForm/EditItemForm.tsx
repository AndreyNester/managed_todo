'use client'

import React, { useState } from 'react';
import { Formik , Form} from 'formik';
import { ITodoSliceState } from '@/lib/features/counter/types';
import { useAppDispatch } from '@/lib/hooks';
import { IEditFTodoCredentials, IEditItemFormProps } from './types';
import { editTodo } from '@/lib/features/counter/todoSlice';


export const EditItemForm= (props: IEditItemFormProps): JSX.Element => {
  const {status, description , onSubmit} = props;
  const dispatch = useAppDispatch();
  const [textareaValue, setTextareaValue] = useState<string>(description);
  const [completed, setCompleted] = useState<boolean>(status==='completed' ? true : false);

  return (
    (
      <Formik
      initialValues={{
        description : textareaValue,
        status : status
      }}
      onSubmit={(
        values: IEditFTodoCredentials,
      ) => {
        const result : ITodoSliceState = {
          email : props.email,
          id : props.id,
          title : props.title,
          status : completed === true ? 'completed' : 'in progress',
          description : textareaValue,
        }
        dispatch(editTodo(result))
        onSubmit(false);
      }
    }
    >
      {({ errors, touched, resetForm }) => (
        <Form action="#" method="POST" >
          <label htmlFor="description">
            description
          </label>
          <textarea
            value={textareaValue}
            onChange={(e)=>setTextareaValue(e.target.value)}
            id="description" 
            name="description" 
            placeholder="some email" 
          />

          <label htmlFor="status">
            completed
          </label>
          <input
            checked={completed}
            onChange={()=>setCompleted((prevState)=>!prevState)}
            id="status" 
            name="status" 
            placeholder="some email" 
            type="checkbox"
          />
          <button type='submit'>save</button>
      </Form>
      )}
    </Formik>
    )
  )
}


