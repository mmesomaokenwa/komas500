'use client'

import React, { useState } from 'react'
import { SlLocationPin } from 'react-icons/sl';
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter} from "@nextui-org/modal";
import { useToast } from "@/hooks/use-toast";
import { Button } from '@nextui-org/react';

type Geolocation = {
  latitude: number;
  longitude: number;
};

type PermissionModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setGeoLocation: React.Dispatch<React.SetStateAction<Geolocation | null>>;
};

const LocationSelector = () => {
  const [geolocation, setGeolocation] = useState<Geolocation | null>(null)
  const [location, setLocation] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const { toast } = useToast()
  
  return (
    <div className="flex w-fit justify-center gap-2 p-1 rounded-md mx-auto border">
      <div className={`flex p-3 text-sm rounded-md gap-1.5`}>
        <SlLocationPin size={20} />
        <p>{location || "Location"}</p>
      </div>

      <div>
        <Button
          onPress={() => setIsOpen(true)}
          className={`p-3 text-sm rounded-md bg-[#3BB77E] text-white`}
        >
          Change Address
        </Button>

        <LocationPermissionModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setGeoLocation={setGeolocation}
        />
      </div>
    </div>
  );
}

export const LocationPermissionModal = ({ isOpen, setIsOpen, setGeoLocation }: PermissionModalProps) => {
  const { toast } = useToast()

  const handleAllow = () => {
    setIsOpen(false)

    if (!navigator.geolocation) {
      return toast({ description: 'Geolocation is not supported by your browser', variant: 'destructive'})
    }

    navigator.geolocation.getCurrentPosition((position) => {
      setGeoLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude })

      toast({ description: "Location permission granted" });
    },
    (error) => { 
      toast({ description: error.message || 'Unable to get your location', variant: 'destructive' })
      },
    {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    })
  }
  
  const handleDeny = () => { 
    setIsOpen(false)
  }
  //   <CustomDrawer open={isOpen} onOpenChange={setIsOpen}>
  //     <div className="flex-1 flex flex-col gap-4">
  //       <h3 className="text-2xl text-center font-semibold">
  //         Allow location access
  //       </h3>
  //       <p className="text-center">
  //         This aids Komas show you stores and restaurants near you
  //       </p>
  //       <div className="flex flex-col gap-2">
  //         <CustomBtn
  //           onClick={handleAllow}
  //           className="w-full p-3 text-white bg-green-500 rounded-md font-medium"
  //         >
  //           Allow Access
  //         </CustomBtn>
  //         <CustomBtn
  //           onClick={handleDeny}
  //           className="w-full p-3 bg-gray-300 rounded-md font-medium"
  //         >
  //           Deny Access
  //         </CustomBtn>
  //       </div>
  //     </div>
  //   </CustomDrawer>
  // ) : (
  //   <CustomModal open={isOpen} onOpenChange={setIsOpen}>
  //     <div className="flex-1 flex flex-col gap-4 p-4">
  //       <h3 className="text-2xl text-center font-semibold">
  //         Allow location access
  //       </h3>
  //       <p className="text-center">
  //         This aids Komas show you stores and restaurants near you
  //       </p>
  //       <div className="flex flex-col gap-2">
  //         <CustomBtn
  //           onClick={handleAllow}
  //           className="w-full p-3 text-white bg-green-500 rounded-md font-medium"
  //         >
  //           Allow Access
  //         </CustomBtn>
  //         <CustomBtn
  //           onClick={handleDeny}
  //           className="w-full p-3 bg-gray-300 rounded-md font-medium"
  //         >
  //           Deny Access
  //         </CustomBtn>
  //       </div>
  //     </div>
  //   </CustomModal>
  // );

  return (
    <Modal isOpen={isOpen} onOpenChange={setIsOpen} backdrop="blur" size="xl">
      <ModalContent>
        <ModalHeader className="text-2xl">
          Allow location access
        </ModalHeader>
        <ModalBody>
          <p>This aids Komas show you stores and restaurants near you</p>
        </ModalBody>
        <ModalFooter className="flex-col">
          <Button
            size="lg"
            className="text-white bg-green-500 font-medium"
            onPress={handleAllow}
          >
            Allow Access
          </Button>
          <Button
            onPress={handleDeny}
            size="lg"
            className="bg-gray-300 font-medium"
          >
            Deny Access
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LocationSelector