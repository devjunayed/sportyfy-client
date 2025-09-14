import { Spin } from 'antd'
import React from 'react'

const LoadingPage = () => {
  return (
    <div className='min-h-full min-w-full '>
      <Spin  size='large'/>
    </div>
  )
}

export default LoadingPage