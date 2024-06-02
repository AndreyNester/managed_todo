'use client'

import { Spin } from "antd";
import { useSession } from "next-auth/react"
import Link from "next/link";

export const HeaderContent = () :JSX.Element => {
  const session = useSession();
  return (session.status === 'loading' ? <Spin size="default" /> :
  session.status === 'unauthenticated' ? <div>not authorized</div> :
  <>
    <span>{session.data?.user.email}</span>
    <Link href='/sign-out'>log out</Link>
  </>
)
}