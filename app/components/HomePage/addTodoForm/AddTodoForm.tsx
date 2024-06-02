'use client'

import React, { useState } from 'react';
import { Field, Formik , Form} from 'formik';
import { ITodoSliceState } from '@/lib/features/counter/types';
import { toFormikValidationSchema } from 'zod-formik-adapter';
import { z } from 'zod';
import { useAppDispatch } from '@/lib/hooks';
import { addTodo } from '@/lib/features/counter/todoSlice';

interface IaddFTodoCredentials extends Omit<ITodoSliceState, 'status' | 'id'> {}
export const AddTodoForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [textareaValue, setTextareaValue] = useState<string>('');

  const validationSchema = z.object({
    title : z.string({required_error : 'required'}).min(3, 'must be minimum 3 characters').max(25, 'must be maximum 25 characters'),
    email : z.string({required_error : 'required'}).email({message : 'Invalid email address'}),
    description : z.string().optional()
  })

  return (
    (
      <Formik
      validationSchema={toFormikValidationSchema(validationSchema)}
      initialValues={{
        title: '',
        email : '',
        description : ''
      }}
      onSubmit={(
        values: IaddFTodoCredentials,
      ) => {
        const result : IaddFTodoCredentials= {
          ...values,
          description: textareaValue
        }
        console.log(result);
        dispatch(addTodo(result))
      }
    }
    >
      {({ errors, touched, resetForm }) => (
        <Form className="space-y-6" action="#" method="POST" style={{border: '1px solid red'}} >
        <div>
          <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
            Title
          </label>
          <div className="mt-2">
            <Field
              id="title" 
              name="title" 
              placeholder="some email" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              type="text"
            />
            {errors.title && touched.title ? <div style={{color: 'red'}}>{errors.title}</div> : null}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            mail
            </label>
          </div>
          <div className="mt-2">
            <Field 
              id="email" 
              name="email" 
              placeholder="email" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              type="email"
            />
            {errors.email && touched.email ? <div style={{color: 'red'}}>{errors.email}</div> : null}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
            description
            </label>
          </div>
          <div className="mt-2">
            <textarea 
              value={textareaValue}
              onChange={(e)=>setTextareaValue(e.target.value)}
              id="description" 
              name="description" 
              placeholder="description" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.description && touched.description ? <div style={{color: 'red'}}>{errors.description}</div> : null}
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add todo
          </button>
        </div>
      </Form>
      )}
    </Formik>
    )
  )
}


