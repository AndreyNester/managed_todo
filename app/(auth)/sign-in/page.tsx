'use client'

import { SignInPage } from "@/app/components/SignInPage/SignInPage";
import { Spin } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

function SignIn() : JSX.Element {
  const {status} = useSession();
  const router = useRouter();


  useLayoutEffect(()=>{
    if (status==='authenticated') router.push('/') 
  })

  return (
    status === 'loading'  || status === 'authenticated'? <Spin size="large" />
    :  <SignInPage/>
   );
}

export default SignIn;