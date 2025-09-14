import { delay } from '@/utils/delay';
import React from 'react'

const AdminDashboardPage = async () => {
  await delay(5000)
  return (
    <div className='mt-20 overflow-y-hidden'>AdminDashboardPage</div>
  )
}

export default AdminDashboardPage;