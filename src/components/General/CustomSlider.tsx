'use client'

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useEmblaCarousel from "embla-carousel-react"
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import { divideIntoArrays } from '@/lib/utils'

type PropsType = {
  options?: EmblaOptionsType
  children: React.ReactNode
  rows?: number
  customArrows?: { prev: React.ReactElement; next: React.ReactElement }
  classNames?: {
    outerWrapper?: string
    innerWrapper?: string
    innerWrapperItem?: string
  }
}

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

const CustomSlider = ({ options, children, classNames, rows = 1, customArrows }: PropsType) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi)

  const clonedChildren = useMemo(() => {
    // Convert children to an array.
    const childrenArray = React.Children.toArray(children)

    // Check if the number of children is divisible by rows.
    const isDivisible = childrenArray.length % rows === 0;

    // If the number of children is divisible by rows, use the children array as is.
    // Otherwise, repeat the children array to make it divisible by rows.
    const repeatedChildren = isDivisible
      ? childrenArray
      : childrenArray.concat(
          // Generate an array of length equal to the number of rows needed to make the children array divisible by rows.
          Array.from({ length: rows - (childrenArray.length % rows) }, (_, i) =>
            // Select the child at the index i % childrenArray.length.
            // This ensures that the repeated children are cycled through in a circular manner.
            childrenArray[i % childrenArray.length]
          )
        );

    return repeatedChildren;
  }, [children, rows])

  const columnsDivided = useMemo(() => divideIntoArrays({
    data: clonedChildren,
    itemsPerArray: rows
  }), [clonedChildren, rows])

  return (
    <div className='relative'>
      <div
        ref={emblaRef}
        className={`overflow-hidden ${classNames?.outerWrapper}`}
      >
        <div className={`flex touch-auto ${classNames?.innerWrapper}`}>
          {columnsDivided.map((column, index) => (
            <div key={index} className={`flex flex-col gap-4 shrink-0 ${classNames?.innerWrapperItem}`}>
              {column.map((child, index) => (
                <div
                  key={index}
                  className='flex flex-1 *:w-full'
                >
                  {child}
                </div>
              ))}
            </div>
          ))}
        </div>
        {customArrows?.next && React.cloneElement(customArrows.next, {
          onClick: onNextButtonClick,
          disabled: nextBtnDisabled,
          style: { display: nextBtnDisabled ? 'none' : undefined}
        })}
        {customArrows?.prev && React.cloneElement(customArrows.prev, {
          onClick: onPrevButtonClick,
          disabled: prevBtnDisabled,
          style: { display: prevBtnDisabled ? 'none' : undefined}
        })}
      </div>
    </div>
  );
}

export default CustomSlider