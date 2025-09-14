import React from 'react'
import Login from './_components/Login'
import { delay } from '@/utils/delay';

const LoginPage = async() => {
await delay();
  return (
    <div>
      <Login />
    </div>
  )
}

export default LoginPage