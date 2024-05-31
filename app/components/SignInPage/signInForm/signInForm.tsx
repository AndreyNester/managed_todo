'use client'

import { Field, Form, Formik } from "formik";
import { ISignInCredentials } from "./types";
import { signIn } from "next-auth/react"
import { useState } from "react";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useRouter } from "next/navigation";
import { verifyCredentials } from "./utils/verifyCredentials";


const validationSchema = z.object({
  email : z.string({required_error : 'required'}).email({message : 'Invalid email address'}),
  password : z.string({required_error : 'required'})
})


export const SignInForm = (): JSX.Element => {
  const router = useRouter();
  const [wrong, setWrong] = useState<boolean>(false);
  return (
    <Formik
    validationSchema={toFormikValidationSchema(validationSchema)}
    initialValues={{
      email: '',
      password : ''
    }}
    onSubmit={ async (
      values: ISignInCredentials
    ) => {
      try {
        const response = await verifyCredentials(values);
        
        await signIn('credentials', {
          ...response,
          redirect : false
        })

        console.log('hurray!');
        router.push('/')
      } catch (err) {
        setWrong(true)
      }
    }
  }
  >
    {({ errors, touched }) => (
      <Form className="space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <Field
              id="email" 
              name="email" 
              placeholder="some email" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              type="email"
              autoComplete="email"
            />
            {errors.email && touched.email ? <div style={{color: 'red'}}>{errors.email}</div> : null}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>
          <div className="mt-2">
            <Field 
              id="password" 
              name="password" 
              placeholder="some password" 
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              required
              type="password"
              autoComplete="current-password"
            />
            {errors.password && touched.password ? <div style={{color: 'red'}}>{errors.password}</div> : null}
          </div>
        </div>
        {wrong ? <span style={{color: 'red'}}>Inccorect email or password</span> : null}

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </Form>
    )}
  </Formik>
  )
}