'use client'
import{ signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const SignOutPage = () : JSX.Element => {
  const {status} = useSession();
  const router = useRouter();

  useEffect(()=>{
    if (status!=='authenticated') router.push('/sign-in') 
  }, [status])

  return (
    <div>
      <button onClick={()=>signOut()}>log out</button>
    </div>
  )
}