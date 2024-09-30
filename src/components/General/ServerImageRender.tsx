import { getImageSrc } from '@/lib/server-actions'
import { Skeleton } from '@nextui-org/react'
import Image, { ImageProps } from 'next/image'
import React, { Suspense } from 'react'

type PropsType = ImageProps & {
  folderName: string
}

const ServerImageRender = ({ folderName, ...props}: PropsType) => {
  return (
    <Suspense
      fallback={
        <Skeleton className={props.className} />
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
      alt={props.alt}
    />
  )
}

export default ServerImageRender