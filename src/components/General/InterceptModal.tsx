'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Modal, ModalContent } from "@nextui-org/modal"
import { cn } from '@/lib/utils'

type PropsType = {
  children: React.ReactNode
  className?: string
}

const InterceptModal = ({ children, className }: PropsType) => {
  const router = useRouter();

  return (
    <Modal
      isOpen
      onClose={() => router.back()}
      size="lg"
      backdrop="blur"
      scrollBehavior="inside"
    >
      <ModalContent className={cn(`custom-scrollbar ${className}`)}>
        {children}
      </ModalContent>
    </Modal>
  );
}

// const InterceptModalContentent = ({ children, className }: PropsType) => {
//   const router = useRouter();

//   return (
//     <Modal
//       isOpen
//       onClose={() => router.back()}
//       size='lg'
//       backdrop='blur'
//       scrollBehavior='inside'
//     >
//       <ModalContent className={cn(`custom-scrollbar ${className}`)}>
//         {children}
//       </ModalContent>
//     </Modal>
//   )
// }

export default InterceptModal