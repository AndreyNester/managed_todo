'use client'

import { useLayoutEffect } from 'react';
import { HomePage } from './components/HomePage/HomePage';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function IndexPage() {
  const {status} = useSession();
  const router = useRouter();


  useLayoutEffect(()=>{
    if (status==='authenticated') router.push('/') 
  })
  return (
    status === 'loading' || status === 'unauthenticated' ? <div>wait a moment</div>
    : <HomePage/>
  ) 
}
