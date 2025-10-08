import React from 'react'
import ManageSlots from './_components/ManageSlots';

const ManageSlotsPage = () => {
  return (
    <div><ManageSlots /></div>
  )
}

export default ManageSlotsPage


export const dynamic = "force-dynamic"; // disables static prerendering
export const fetchCache = "force-no-store"; // disables caching/fetch optimization
export const revalidate = 0; // optional: ensures no ISR