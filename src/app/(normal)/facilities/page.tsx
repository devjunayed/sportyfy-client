import React from 'react'
import Facilities from './_components/Facilities'

const FacilitiesPage = () => {
  return (
    <div><Facilities /></div>
  )
}

export default FacilitiesPage

export const dynamic = "force-dynamic"; // disables static prerendering
export const fetchCache = "force-no-store"; // disables caching/fetch optimization
export const revalidate = 0; // optional: ensures no ISR