'use client'

import { useImage } from '@/hooks/queries'
import Image, { ImageProps } from 'next/image'
import React from 'react'

type PropsType = ImageProps & {
  folderName: string
}

const ClientImageRender = ({ folderName, ...props }: PropsType) => {
  const { data: src, isLoading } = useImage({ folderName, fileName: props.src as string })

  return isLoading ? (
    <div className={`bg-gray-200 animate-pulse ${props.className}`} />
  ) : (
    <Image {...props} src={src || ""} />
  );
}

export default ClientImageRender