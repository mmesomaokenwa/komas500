import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'Support Center',
}

export default function SupportCenter() {
  return (
    <div className='text-2xl font-semibold w-fill text-center mt-10 min-h-[70vh]'>SupportCenter</div>
  )
}
