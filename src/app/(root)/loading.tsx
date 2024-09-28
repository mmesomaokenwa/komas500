import Loader from '@/components/General/Loader'
import React from 'react'

const RootLoading = () => {
  return (
    <div className='flex-1 w-full h-[90vh] flex items-center justify-center'>
      <Loader />
    </div>
  )
}

export default RootLoading