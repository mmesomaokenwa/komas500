"use client";

import { useAppDispatch, useAppSelector } from "@/redux-store/hooks";
import {
  DeliveryAddress,
  deliveryActions,
} from "@/redux-store/store-slices/DeliverySlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { generateRandomId } from "@/lib/utils";
import { shippingSchema } from "@/lib/schemas";
import { useInterceptModal } from "@/providers/InterceptModalProvider";
import { useToast } from "@/hooks/use-toast";
import { Button, Input } from "@nextui-org/react";

type FormData = z.infer<typeof shippingSchema>;

type PropsType = {
  action: "add" | "edit";
  addressId?: string;
  isIntercepted?: boolean
};

const DeliveryAddressForm = ({ action, addressId, isIntercepted }: PropsType) => {
  const user = useAppSelector((state) => state.user);
  const addressList = useAppSelector((state) => state.delivery.addressList);
  const selectedAddress = addressList.find(
    (address) => address.id === addressId
  );

  const dispatch = useAppDispatch();

  const form = useForm<FormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      firstName: selectedAddress?.firstName || user.fullName.split(" ")[0] || "",
      lastName: selectedAddress?.lastName || user.fullName.split(" ")[1] || "",
      emailAddress: selectedAddress?.emailAddress || user.emailAddress || "",
      phoneNumber: selectedAddress?.phoneNumber || user.phoneNumber || "",
      houseNumber: selectedAddress?.houseNumber || "",
      streetAddress: selectedAddress?.streetAddress || "",
      city: selectedAddress?.city || "",
      state: selectedAddress?.state || "",
    },
  });

  const { setOpen } = useInterceptModal();
  const { toast } = useToast()
  const router = useRouter();

  const onSubmit = (data: FormData) => {
    // Check if the action is to add a new address
    if (action === "add") {
      // Create a new address object with a random ID and form data
      const newAddress: DeliveryAddress = {
        id: generateRandomId(15),
        ...data,
      };

      // Dispatch an action to add the new address to the store
      dispatch(deliveryActions.addDeliveryAddress(newAddress));

      // Show a success toast message
      toast({ description: 'Address added successfully' })
    }

    // Check if the action is to edit an existing address
    if (action === "edit") {
      // Create an updated address object with the existing ID and new form data
      const updatedAddress: DeliveryAddress = {
        id: addressId || "",
        ...data,
      };

      // Dispatch an action to edit the existing address in the store
      dispatch(deliveryActions.editDeliveryAddress(updatedAddress));

      // Show a success toast message
      toast({ description: 'Address updated successfully' })
    }

    // Reset the form after submission
    form.reset(data)

    // Close the modal if intercepted, otherwise refresh the router
    isIntercepted ? setOpen(false) : router.refresh()
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-col w-full gap-4 bg-white"
    >
      <div className="flex flex-col gap-4">
        <Input
          label="First Name"
          labelPlacement="outside"
          placeholder="First Name"
          size="lg"
          isInvalid={!!form.formState.errors.firstName}
          {...form.register("firstName")}
          errorMessage={form.formState.errors.firstName?.message}
          classNames={{
            label: "font-medium",
          }}
        />
        <Input
          label="Last Name"
          labelPlacement="outside"
          placeholder="Last Name"
          size="lg"
          isInvalid={!!form.formState.errors.lastName}
          {...form.register("lastName")}
          errorMessage={form.formState.errors.lastName?.message}
          classNames={{
            label: "font-medium",
          }}
        />
        <Input
          type="email"
          label="Email"
          labelPlacement="outside"
          placeholder="Email"
          size="lg"
          isInvalid={!!form.formState.errors.emailAddress}
          {...form.register("emailAddress")}
          errorMessage={form.formState.errors.emailAddress?.message}
          classNames={{
            label: "font-medium",
          }}
        />
        <Input
          type="tel"
          label="Phone Number"
          labelPlacement="outside"
          placeholder="Phone Number"
          size="lg"
          isInvalid={!!form.formState.errors.phoneNumber}
          {...form.register("phoneNumber")}
          errorMessage={form.formState.errors.phoneNumber?.message}
          classNames={{
            label: "font-medium",
          }}
        />
        <Input
          label="House Number"
          labelPlacement="outside"
          placeholder="House Number"
          size="lg"
          isInvalid={!!form.formState.errors.houseNumber}
          {...form.register("houseNumber")}
          errorMessage={form.formState.errors.houseNumber?.message}
          classNames={{
            label: "font-medium",
          }}
        />
        <Input
          label="Street Address"
          labelPlacement="outside"
          placeholder="Street Address"
          size="lg"
          isInvalid={!!form.formState.errors.streetAddress}
          {...form.register("streetAddress")}
          errorMessage={form.formState.errors.streetAddress?.message}
          classNames={{
            label: "font-medium",
          }}
        />
        <Input
          label="City"
          labelPlacement="outside"
          placeholder="City"
          size="lg"
          isInvalid={!!form.formState.errors.city}
          {...form.register("city")}
          errorMessage={form.formState.errors.city?.message}
          classNames={{
            label: "font-medium",
          }}
        />
        <Input
          label="State"
          labelPlacement="outside"
          placeholder="State"
          size="lg"
          isInvalid={!!form.formState.errors.state}
          {...form.register("state")}
          errorMessage={form.formState.errors.state?.message}
          classNames={{
            label: "font-medium",
          }}
        />
      </div>
      <Button
        type="submit"
        isDisabled={!form.formState.isDirty || form.formState.isSubmitting}
        isLoading={form.formState.isSubmitting}
        size="lg"
        className="w-full md:w-[75%] bg-green-500 text-white mx-auto my-4"
      >
        {form.formState.isSubmitting ? "Submitting" : "Continue"}
      </Button>
    </form>
  );
};

export default DeliveryAddressForm;
