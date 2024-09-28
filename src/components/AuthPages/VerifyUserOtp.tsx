"use client";

import React, { useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/redux-store/hooks";
import { userActions } from "@/redux-store/store-slices/UserSlice";
import { verifyUser } from "@/lib/server-actions/auth";
import { getUser } from "@/lib/server-actions/user";
import { Button } from "@nextui-org/react";

const formSchema = z.object({
  code: z.string().min(4).max(4),
  username: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

type PropsType = {
  username?: string;
  redirect?: string;
  replaceHistory?: boolean;
};

const VerifyUserOtp = ({ username, redirect, replaceHistory }: PropsType) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    defaultValues: {
      username: username || "",
      code: "",
    },
  });

  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (username) form.setValue("username", username);
  }, [username, form]);

  const handleChange = (value: string) => {
    form.setValue("code", value);
  };

  const onSubmit = async (data: FormValues) => {
    // If the username is missing, display an error toast and exit.
    if (!data.username) {
      return toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }

    // Try to verify the OTP using the server action.
    const response = await verifyUser({
      ...data, // Spread the form data to include the username.
      username: data.username, // Set the username explicitly.
    });

    // If the server action returns an error, display the error toast and exit.
    if (response.hasError) {
      return toast({
        title: "Error",
        description: response.message,
        variant: "destructive",
      });
    }

    // If the verification is successful, get the user data from the server.
    const { data: user } = await getUser();

    // If the user data is available, dispatch an action to update the user state.
    user && dispatch(userActions.setUser(user));

    // Display a success toast to the user.
    toast({
      description: "OTP verified successfully",
    });

    // Redirect the user to the specified page or the home page if no redirect is specified.
    replaceHistory
      ? router.replace(redirect || "/")
      : router.push(redirect || "/");
  };
  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
      <InputOTP
        maxLength={4}
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

export default VerifyUserOtp;
