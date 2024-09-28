'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Modal, ModalContent } from "@nextui-org/modal"
import InterceptModalProvider, { useInterceptModal } from '@/providers/InterceptModalProvider'
import { cn } from '@/lib/utils'

type PropsType = {
  children: React.ReactNode
  className?: string
}

const InterceptModal = ({ children, className }: PropsType) => {
  return (
    <InterceptModalProvider>
      <InterceptModalContentent className={className}>
        {children}
      </InterceptModalContentent>
    </InterceptModalProvider>
  )
}

const InterceptModalContentent = ({ children, className }: PropsType) => {
  const { open, setOpen } = useInterceptModal()
  const router = useRouter();

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    !isOpen && router.back();
  };
  //   <CustomModal
  //     open={open}
  //     onOpenChange={handleOpenChange}
  //     addCloseBtn
  //     classNames={classNames}
  //   >
  //     {children}
  //   </CustomModal>
  // ) : (
  //   <CustomDrawer
  //     open={open}
  //     onOpenChange={handleOpenChange}
  //     classNames={classNames}
  //   >
  //     {children}
  //   </CustomDrawer>
  // );

  return (
    <Modal
      isOpen={open}
      onOpenChange={handleOpenChange}
      size='lg'
      backdrop='blur'
      scrollBehavior='inside'
    >
      <ModalContent className={cn(`custom-scrollbar ${className}`)}>
        {children}
      </ModalContent>
    </Modal>
  )
}

export default InterceptModal