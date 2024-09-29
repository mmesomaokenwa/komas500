'use client'

import React from 'react'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useToast } from "@/hooks/use-toast";
import { Button } from '@nextui-org/react';

const formSchema = z.object({
  code: z.string().min(4).max(4),
  email: z.string().email().optional()
})

type FormValues = z.infer<typeof formSchema>

type PropsType = {
  email?: string;
  callbackUrl?: string;
  replaceHistory?: boolean;
};

const ForgotPasswordOtp = ({
  email,
  callbackUrl,
  replaceHistory,
}: PropsType) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      email: email || "",
      code: "",
    },
  });

  const router = useRouter();

  const { toast } = useToast();

  const handleChange = (value: string) => {
    form.setValue("code", value);
  };

  const onSubmit = (data: FormValues) => {
    if (!data.email)
      return toast({
        description: "Something went wrong",
        variant: "destructive",
      });

    try {
      toast({
        description: "OTP verified successfully",
      });

      const searchParams = new URLSearchParams({
        email: data.email,
        code: data.code,
        callbackUrl: callbackUrl || "",
      });

      replaceHistory
        ? router.replace(`/forgot-password/reset?${searchParams.toString()}`)
        : router.push(`/forgot-password/reset?${searchParams.toString()}`);
    } catch (error) {
      toast({
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
      <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
        value={form.watch("code")}
        onChange={handleChange}
        containerClassName="mx-auto"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <>
            <InputOTPGroup key={index}>
              <InputOTPSlot index={index} className="size-14 text-xl" />
            </InputOTPGroup>
            {index !== 3 && <InputOTPSeparator />}
          </>
        ))}
      </InputOTP>
      <Button
        type="submit"
        isDisabled={form.formState.isSubmitting}
        isLoading={form.formState.isSubmitting}
        size="lg"
        className="bg-green-500 text-white rounded-md font-medium"
      >
        {form.formState.isSubmitting ? "Verifying..." : "Verify"}
      </Button>
    </form>
  );
};

export default ForgotPasswordOtp