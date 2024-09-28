import { getImageSrc } from '@/lib/server-actions'
import Image, { ImageProps } from 'next/image'
import React, { Suspense } from 'react'

type PropsType = ImageProps & {
  folderName: string
}

const ServerImageRender = ({ folderName, ...props}: PropsType) => {
  return (
    <Suspense
      fallback={
        <div className={`bg-gray-200 animate-pulse ${props.className}`} />
      }
    >
      <ServerImage {...props} folderName={folderName} />
    </Suspense>
  )
}

const ServerImage = async ({ folderName, ...props }: PropsType) => {
  const { data: src } = await getImageSrc({
    folderName,
    fileName: props.src as string
  })

  return (
    <Image
      {...props}
      src={src || ''}
    />
  )
}

export default ServerImageRender