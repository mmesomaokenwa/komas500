"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { RadioGroup, RadioProps } from "@nextui-org/react";
import CustomRadio from "../General/CustomRadio";
import { useAppSelector } from "@/redux-store/hooks";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { paymentSchema } from "@/lib/schemas";
import { Button } from "@nextui-org/react";

type FormData = z.infer<typeof paymentSchema>;

type PropsType = {
  shopmateId: string;
  vendorId: string;
  phoneNumber: string;
  address: string;
  emailAddress: string;
};

const radioClassNames: RadioProps["classNames"] = {
  base: "w-full max-w-full flex-row justify-start items-start data-[selected=true]:border-transparent hover:bg-content1",
  label: "font-semibold -mt-1",
  description: "flex-1 flex  justify-between gap-4 text-black",
  labelWrapper: "gap-2 flex-1",
};

const PaymentForm = ({
  shopmateId,
  vendorId,
  phoneNumber,
  address,
  emailAddress,
}: PropsType) => {
  const user = useAppSelector((state) => state.user);

  const form = useForm<FormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      user: {
        fullName: user.fullName,
        address: user.address,
        phoneNumber: user.phoneNumber,
      },
      delivery: {
        type: "",
        address: "",
      },
    },
    mode: "all",
  });

  const router = useRouter();

  const watchedValues = form.watch();

  useEffect(() => {
    user && form.setValue("user", user);
  }, [user, form]);

  useEffect(() => {
    const deliveryDetails = localStorage.getItem("delivery details");

    if (deliveryDetails) {
      try {
        const parsedData: { type: string; deliveryAddress: string } =
          JSON.parse(deliveryDetails);

        form.setValue(
          "delivery",
          {
            type: parsedData.type,
            address: parsedData.deliveryAddress,
          },
          {
            shouldDirty: true,
            shouldValidate: true,
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  }, [form]);

  const onSubmit = (data: FormData) => {
    const searchParams = new URLSearchParams({
      shopmateId,
      vendor: vendorId,
      phone: data.user.phoneNumber,
      address: data.user.address,
      email: emailAddress || user.emailAddress,
    });
    router.push(`/checkout/payment?${searchParams.toString()}`);
  };
  return (
    <form
      className="max-w-6xl w-full flex flex-col gap-6 mx-auto p-4"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4">
        <RadioGroup
          value={
            watchedValues.user.fullName &&
            watchedValues.user.address &&
            watchedValues.user.phoneNumber
              ? "true"
              : "false"
          }
          color="success"
        >
          <CustomRadio
            value={"true"}
            description={
              <>
                <p className="text-sm">
                  {`${watchedValues.user.fullName || "No full name"} | ${
                    watchedValues.user.address || "No address"
                  } | ${watchedValues.user.phoneNumber || "No phone number"}`}
                </p>
                <Link
                  href={"/account/profile/edit/me"}
                  className="text-green-500 font-semibold ml-auto"
                >
                  Edit
                </Link>
              </>
            }
            classNames={radioClassNames}
          >
            Customer Details
          </CustomRadio>
        </RadioGroup>
        <RadioGroup
          value={form.getFieldState("delivery").isDirty.toString()}
          color="success"
        >
          <CustomRadio
            value={"true"}
            description={
              <>
                <div>
                  <p className="text-sm">
                    Items in the cart are delivered to you in your below
                    address.
                  </p>
                  <p className="text-sm mt-2">
                    <span className="font-medium">Address</span> |{" "}
                    {watchedValues.delivery.address || "Not selected"}
                  </p>
                </div>
                <Link
                  href={"/checkout?step=1"}
                  className="text-green-500 font-semibold ml-auto"
                >
                  Edit
                </Link>
              </>
            }
            classNames={radioClassNames}
          >
            Delivery Option{" "}
            <span className="font-medium">
              | {watchedValues.delivery.type || "Not selected"}
            </span>
          </CustomRadio>
        </RadioGroup>
        <RadioGroup
          value={"true"}
          color="success"
          classNames={{
            base: 'bg-content1 rounded-2xl',
            wrapper: 'gap-0'
          }}
        >
          <CustomRadio
            value={"true"}
            description="You will be directed to our secure Checkout page"
            classNames={radioClassNames}
          >
            Payment
          </CustomRadio>
          <CustomRadio
            value={"true"}
            description={
              <>
                <p className="text-sm">
                  Pickup items from a Fulfillment center that is convenient for
                  you. Save some amount on delivery charges.
                </p>
                <Button
                  type="submit"
                  className="w-full py-3 text-base font-medium bg-green-500 text-white"
                >
                  Proceed to payment
                </Button>
              </>
            }
            classNames={{
              ...radioClassNames,
              description: "flex-1 flex flex-col justify-between gap-4 text-black",
            }}
          >
            Pay with card | Bank transfer
          </CustomRadio>
        </RadioGroup>
      </div>
      <Link href={"/"} className="ml-12 text-sm md:text-base">
        {"< Go back and continue shopping"}
      </Link>
    </form>
  );
};

export default PaymentForm;
