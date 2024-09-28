import React from 'react'
import Link from 'next/link'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'

type CheckoutOptionsModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  vendorId?: string
}

const CheckoutOptionsModal: React.FC<CheckoutOptionsModalProps> = ({ open, onOpenChange, vendorId }) => {
  const generateCheckoutUrl = (shopmate: boolean) => {
    const searchParams = new URLSearchParams({
      step: '1',
      vendorId: vendorId || '',
      shopmate: shopmate.toString(),
    })
    return `/checkout?${searchParams.toString()}`
  }
  
  return (
    <Modal
      isOpen={open}
      onOpenChange={onOpenChange}
      backdrop='blur'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Choose Checkout Option</ModalHeader>
            <ModalBody>
              <p>Would you like to checkout as a customer or as a shopmate?</p>
            </ModalBody>
            <ModalFooter>
              <Button onPress={onClose} color='primary'>
                <Link
                  href={generateCheckoutUrl(false)}
                  className="flex-1 text-white font-medium"
                >
                  Checkout as Customer
                </Link>
              </Button>
              <Button onPress={onClose} color='secondary'>
                <Link
                  href={generateCheckoutUrl(true)}
                  className="flex-1 font-medium"
                >
                  Checkout as Shopmate
                </Link>
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default CheckoutOptionsModal