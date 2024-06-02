'use client'

import { useEffect } from 'react';
import { HomePage } from './components/HomePage/HomePage';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Spin } from 'antd';

export default function IndexPage() {
  const {status} = useSession();
  const router = useRouter();


  useEffect(()=>{
    if (status==='unauthenticated') router.push('/sign-in') 
  }, [status])
  return (
    status === 'loading' || status === 'unauthenticated' ? <Spin size="large" />
    : <HomePage/>
    ) 
}
