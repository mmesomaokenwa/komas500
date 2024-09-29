'use client'

import Image from 'next/image';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { PanInfo, motion, useMotionValue } from 'framer-motion';
import ClientImageRender from '../General/ClientImageRender';
import { springOptions } from '@/constants';
import { Button } from '@nextui-org/react';

type PropsType = {
  images: string[]
}

const ProductImages = ({images}: PropsType) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const dragX = useMotionValue(0) // returns the current distance in px by which the slide is dragged
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const goToNext = useCallback(() => {
    if (currentIndex < images.length - 1) setCurrentIndex(currentIndex + 1)
    else setCurrentIndex(0)
  }, [images, currentIndex])

  const goToPrevious = useCallback(() => {
    if (currentIndex >= 0) setCurrentIndex(currentIndex - 1)
    else setCurrentIndex(images.length - 1)
  }, [images, currentIndex])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  // Go to change slide after drag
  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (dragX.get() <= -50 && currentIndex < images.length - 1) goToNext();
    else if (dragX.get() >= 50 && currentIndex > 0) goToPrevious();
  };

  // implement auto-slide every 10s
  useEffect(() => {
    if (timerRef.current) { 
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      // stop auto slide if the slide is currently being dragged
      dragX.get() === 0 && goToNext()
    }, 10000)
    
    return () => {
      if (timerRef.current) { 
        clearInterval(timerRef.current)
      }
    }
  }, [goToNext, dragX])
  
  return (
    <div className="flex flex-col items-center gap-4 flex-1">
      <div
        className={`w-full rounded-xl overflow-hidden relative ${images.length ? 'aspect-square' : 'aspect-video md:aspect-square flex items-center justify-center bg-gray-100'}`}
      >
        {images.length ? (
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            style={{ x: dragX }}
            animate={{
              translateX: `-${currentIndex * 100}%`,
            }}
            transition={springOptions}
            onDragEnd={onDragEnd}
            className="flex items-center cursor-grab active:cursor-grabbing"
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                animate={{
                  scale: currentIndex === index ? 1 : 0.9,
                }}
                transition={springOptions}
                className="w-full aspect-square shrink-0"
              >
                <ClientImageRender
                  folderName="products"
                  src={image}
                  alt={image}
                  height={500}
                  width={500}
                  className="object-cover overflow-hidden w-full aspect-square pointer-events-none rounded-xl"
                />
              </motion.div>
            ))}
          </motion.div>
        ) : (
            <p className='font-medium '>No images</p>
        )}
      </div>
      <div className="flex flex-col items-center gap-6">
        {images.length ? (
          <div className="flex items-center gap-2">
            {images.map((image, index) =>
              index !== images.length - 1 ? (
                <React.Fragment key={index}>
                  <ClientImageRender
                    folderName="products"
                    src={image}
                    alt={image}
                    height={100}
                    width={100}
                    isZoomed
                    className={`size-20 rounded-xl object-cover border-2 cursor-pointer ${
                      currentIndex === index
                        ? "border-green-500"
                        : "border-transparent"
                    }`}
                    onClick={() => goToSlide(index)}
                  />
                  <Image
                    src={"/Icons/Vector 53.svg"}
                    alt="separator"
                    height={20}
                    width={20}
                    className="text-green-500"
                  />
                </React.Fragment>
              ) : (
                <ClientImageRender
                  folderName="products"
                  key={index}
                  src={image}
                  alt={image}
                  height={100}
                  width={100}
                  isZoomed
                  className={`size-20 rounded-xl object-cover border-2 cursor-pointer ${
                    currentIndex === index
                      ? "border-green-500"
                      : "border-transparent"
                  }`}
                  onClick={() => goToSlide(index)}
                />
              )
            )}
          </div>
        ) : null}
        <Button
          size='lg'
          className="w-full p-3 bg-yellow-400 text-white rounded-lg"
        >
          Add more toppings
        </Button>
      </div>
    </div>
  );
}

export default ProductImages