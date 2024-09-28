import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'About Us'
}

export default function AboutUs() {
  return (
    <div className='text-2xl font-semibold w-fill min-h-[70vh] text-center mt-10'>AboutUs</div>
  )
}
