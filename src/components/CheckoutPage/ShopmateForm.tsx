'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { shopmateSchema } from '@/lib/schemas'
import { useRouter } from 'next/navigation'
import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { Button, Input } from '@nextui-org/react'
import { shopmateUsers, users } from '@/data/users'
import UserAutocompleteCard from './UserAutocompleteCard'

type ShopmateFormType = z.infer<typeof shopmateSchema>

type PropsType = {
  vendorId?: string
}

const ShopmateForm = ({ vendorId }: PropsType) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ShopmateFormType>({
    resolver: zodResolver(shopmateSchema),
    mode: 'onBlur'
  })

  const router = useRouter()

  const onSubmit = (data: ShopmateFormType) => {
    console.log(data)

    const searchParams = new URLSearchParams({
      step: '2',
      shopmate: 'true',
      vendorId: vendorId || '',
      ...data,
    })

    router.push(`/checkout?${searchParams.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Autocomplete
        label={<span className="font-medium">Shopmate ID</span>}
        labelPlacement="outside"
        placeholder="Enter your shopmate ID"
        size="lg"
        isInvalid={!!errors.shopmateId}
        {...register("shopmateId")}
        errorMessage={errors.shopmateId?.message}
        defaultItems={shopmateUsers}
      >
        {(shopmate) => (
          <AutocompleteItem
            key={shopmate._id || shopmate.emailAddress}
            textValue={shopmate._id}
          >
            <UserAutocompleteCard user={shopmate} description='_id' />
          </AutocompleteItem>
        )}
      </Autocomplete>
      <Autocomplete
        label={<span className="font-medium">Email</span>}
        labelPlacement="outside"
        placeholder="Search for customer email"
        size="lg"
        isInvalid={!!errors.emailAddress}
        {...register("emailAddress")}
        errorMessage={errors.emailAddress?.message}
        defaultItems={users}
      >
        {(user) => (
          <AutocompleteItem
            key={user._id || user.emailAddress}
            textValue={user.emailAddress}
          >
            <UserAutocompleteCard user={user} description='emailAddress' />
          </AutocompleteItem>
        )}
      </Autocomplete>
      <Input
        type="tel"
        label="Phone Number"
        labelPlacement="outside"
        placeholder="Enter customer phone number"
        size="lg"
        isInvalid={!!errors.phoneNumber}
        {...register("phoneNumber")}
        errorMessage={errors.phoneNumber?.message}
        classNames={{
          label: "font-medium",
        }}
      />
      <Input
        label="Shipping Address"
        labelPlacement="outside"
        placeholder="Enter customer shipping address"
        size="lg"
        isInvalid={!!errors.address}
        {...register("address")}
        errorMessage={errors.address?.message}
        classNames={{
          label: "font-medium",
        }}
      />
      <Button
        type="submit"
        isDisabled={isSubmitting}
        isLoading={isSubmitting}
        size="lg"
        className="bg-green-500 text-white rounded-xl"
      >
        {isSubmitting ? "Submitting" : "Next"}
      </Button>
    </form>
  );
}

export default ShopmateForm