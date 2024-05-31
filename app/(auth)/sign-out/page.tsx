'use client'

import { SignOutPage } from "@/app/components/SignOutPage/SignOutPage";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

function SignOut() : JSX.Element {
  const {status} = useSession();
  const router = useRouter();

  useLayoutEffect(()=>{
    if (status!=='authenticated') router.push('/sign-in') 
  })
  return ( 
    <SignOutPage/>
   );
}

export default SignOut;