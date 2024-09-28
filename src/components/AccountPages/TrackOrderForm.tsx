"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { formUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { trackOrderSchema } from "@/lib/schemas";
import { Button, Input } from "@nextui-org/react";

type FormType = z.infer<typeof trackOrderSchema>;

type PropsType = {
  orderId?: string
};

const TrackOrderForm = ({ orderId }: PropsType) => {
  const form = useForm<FormType>({
    resolver: zodResolver(trackOrderSchema),
    defaultValues: {
      orderId: orderId || "",
    },
    mode: "onTouched",
  });

  const searchParams = useSearchParams();

  const router = useRouter();

  const onSubmit = (data: FormType) => {
    //store the state as search param
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      keys: ["orderId"],
      values: [data.orderId],
    });

    form.reset();

    //navigate to the new url with the query as search param
    router.push(newUrl, { scroll: false });
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <Input
        placeholder="Enter Tracking Number"
        variant="bordered"
        size="lg"
        radius="sm"
        {...form.register("orderId")}
        isInvalid={!!form.formState.errors.orderId}
        errorMessage={form.formState.errors.orderId?.message}
        endContent={
          <Button
            type="submit"
            size="lg"
            className="bg-green-500 text-white font-medium"
            radius="sm"
          >
            Track Order
          </Button>
        }
        classNames={{
          inputWrapper: "p-2 h-full  rounded-md border border-[#908B8B]",
          input:
            "w-full p-2 py-3 placeholder:text-[#6F7472] font-medium",
        }}
      />
    </form>
  );
};

export default TrackOrderForm;
