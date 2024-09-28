'use client'

import React from 'react'
import { Pagination } from "@nextui-org/react"
import { useRouter, useSearchParams } from 'next/navigation'
import { formUrlQuery } from '@/lib/utils'

type PropsType = {
  pageCount: number
  currentPage: number
}

const StoresPaginationControls = ({ pageCount, currentPage }: PropsType) => {
  const router = useRouter()

  const searchParams = useSearchParams()

  const handlePageChange = (page: number) => { 
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      keys: ['page'],
      values: [page.toString()]
    })

    router.push(newUrl)
  }
  
  return (
    <Pagination
      showControls
      total={pageCount}
      page={currentPage + 1}
      onChange={handlePageChange}
      classNames={{
        cursor: 'bg-green-500'
      }}
    />
  );
}

export default StoresPaginationControls