'use client'

import { Counter } from "./components/counter/Counter";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";

export default function IndexPage() {

  const {status} = useSession();
  const router = useRouter();

  useLayoutEffect(()=>{
    if (status !=='authenticated') router.push('/sign-in') 
  })
  
  return (
    <>
      <Link href='/sign-in' >to sign in</Link>
      <Link href='/sign-out' >to sign out</Link>
    </>
  )
}
