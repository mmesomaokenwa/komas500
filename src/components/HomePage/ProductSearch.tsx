'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { RiSearchLine } from 'react-icons/ri';
import { formUrlQuery, removeKeysFromQuery } from '@/lib/utils';
import CategorySelect from './CategorySelect';

type PropsType = {
  classNames?: {
    wrapper?: string
    input?: string
    button?: string
  }
  searchFor: 'product' | 'store'
  addFilter?: boolean
  q?: string
  category?: string
}

const ProductSearch = ({ classNames, searchFor, addFilter, q, category }: PropsType) => {
  const [query, setQuery] = useState(q || '')
  const [selected, setSelected] = useState(category || 'all')
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => setQuery(q || ''), [q])

  useEffect(() => setSelected(category || 'all'), [category])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const searchQuery = query
    setQuery('')

    //store the state as search param
    let newUrl: string

    if (selected === 'all') {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      })

      newUrl = formUrlQuery({
        params: newUrl.split('?')[1],
        keys: ["query"],
        values: [searchQuery],
      })
    } else {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        keys: ["category", "query"],
        values: [selected, searchQuery],
      })
    }

    //navigate to the new url with the query as search param
    router.push(newUrl, {scroll: false})
  }
  return (
    <form
      onSubmit={handleSearch}
      className={`flex mt-10 ${classNames?.wrapper}`}
    >
      {addFilter && (
        <CategorySelect
          selected={selected}
          setSelected={setSelected}
        />
      )}
      <input
        type="search"
        id="search-dropdown"
        className={`block p-4 w-full text-md outline-none ${
          !addFilter && "rounded-l-lg rounded-s-gray-100"
        } ${classNames?.input}`}
        placeholder={`Search for ${searchFor}`}
        required
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        className={`flex justify-center items-center text-white rounded-r-lg px-4 space-x-2 bg-[#3BB77E] py-4 ${classNames?.button}`}
      >
        <RiSearchLine size={25} />
        <span> Search</span>
      </button>
    </form>
  );
}

export default ProductSearch