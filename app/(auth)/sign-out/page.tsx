'use client'

import { SignOutPage } from "@/app/components/SignOutPage/SignOutPage";
import { Spin } from "antd";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

function SignOut() : JSX.Element {
  const {status} = useSession();
  const router = useRouter();

  useLayoutEffect(()=>{
    if (status==='unauthenticated') router.push('/sign-in') 
  })
  return ( 
    status === 'loading' || status === 'unauthenticated' ? <Spin size="large" />
    : <SignOutPage/>
   );
}

export default SignOut;