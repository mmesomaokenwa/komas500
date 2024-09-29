"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/lib/schemas";
import Link from "next/link";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { createUser, loginUser, resetPassword, sendPasswordResetCode } from "@/lib/server-actions/auth";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";

type Action = "register" | "login" | "forgot-password" | "reset-password";

type FormValues<T extends Action> = T extends "register"
  ? z.infer<typeof registerSchema>
  : T extends "login"
  ? z.infer<typeof loginSchema>
  : T extends "forgot-password"
  ? z.infer<typeof forgotPasswordSchema>
  : z.infer<typeof resetPasswordSchema>;

const formSchema = {
  register: registerSchema,
  login: loginSchema,
  "forgot-password": forgotPasswordSchema,
  "reset-password": resetPasswordSchema,
};

interface PropsType<T extends Action> {
  action: T;
  callbackUrl?: string; // redirect to this page after successful login
  replaceHistory?: boolean;
  resetPasswordCode?: string
}

const AuthForm = <T extends Action>({ action, callbackUrl, replaceHistory, resetPasswordCode }: PropsType<T>) => {
  const form = useForm<FormValues<"register">>({
    resolver: zodResolver(formSchema[action]),
    mode: "all",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { toast } = useToast();

const onSubmit = async (data: FormValues<"register">) => {
    // Check the action type to determine the operation to perform
    if (action === "register") {
      // Create a new user with the provided data
      const res = await createUser(data);

      // Display success or error message based on the response
      if (res.hasError)
        return toast({
          description: res.message,
          variant: "destructive",
        });

      toast({
        description: res.message,
      });

      // Set is2FAEnabled in localStorage
      localStorage.setItem("is2FAEnabled", "true");

      const searchParams = new URLSearchParams({
        username: data.emailAddress,
        callbackUrl: callbackUrl || '',
      });

      // Redirect to OTP verification with optional redirect URL
      replaceHistory
        ? router.replace(`/otp-verify?${searchParams.toString()}`)
        : router.push(`/otp-verify?${searchParams.toString()}`);
    } else if (action === "login") {
      // Log in the user with provided username and password
      const res = await loginUser({
        username: data.emailAddress,
        password: data.password,
      });

      // Display success or error message based on the response
      if (res.hasError)
        return toast({
          description: res.message,
          variant: "destructive",
        })
      
      if (!!res.data) {
        const res = await signIn('credentials', {
          username: data.emailAddress,
          password: data.password,
          code: '',
          redirect: false
        })

        if (!!res?.error)
          return toast({
            description: res.error,
            variant: "destructive",
          })
      }

      toast({
        description: res.message
      });

      // Set is2FAEnabled in localStorage
      localStorage.setItem("is2FAEnabled", (!res.data).toString());

      const searchParams = new URLSearchParams({
        username: data.emailAddress,
        callbackUrl: callbackUrl || '',
      })

      // Redirect to OTP verification with optional redirect URL or redirect to the intended URL if 2FA is disabled
      replaceHistory
        ? res.data
          ? router.replace(callbackUrl || "/")
          : router.replace(`/otp-verify?${searchParams.toString()}`)
        : res.data
        ? router.push(callbackUrl || "/")
        : router.push(`/otp-verify?${searchParams.toString()}`);
    } else if (action === 'forgot-password') {
      // Send password reset email
      const res = await sendPasswordResetCode(data.emailAddress);

      // Display success or error message based on the response
      if (res.hasError)
        return toast({
          description: res.message,
          variant: "destructive",
        });
      
      toast({
        description: res.message,
      });

      const searchParams = new URLSearchParams({
        email: data.emailAddress,
        callbackUrl: callbackUrl || '',
      })

      // Redirect to forgot password reset page with optional redirect URL
      replaceHistory
        ? router.replace(
            `/forgot-password/reset?${searchParams.toString()}`
          )
        : router.push(
            `/forgot-password/reset?${searchParams.toString()}`
          );
    } else {
      // Reset password
      const res = await resetPassword({
        username: data.emailAddress,
        code: resetPasswordCode || '',
        password: data.password,
      });

      // Display success or error message based on the response
      if (res.hasError)
        return toast({
          description: res.message,
          variant: "destructive",
        });
      
      toast({
        description: res.message,
      });

      // Redirect user to the provided redirect URL or home page
      replaceHistory ? router.replace(callbackUrl || "/") : router.push(callbackUrl || "/");
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-3">
      {action === "register" && (
        <Input
          label="Full Name"
          size="lg"
          variant="underlined"
          color="success"
          isInvalid={!!form.formState.errors.fullName}
          {...form.register("fullName")}
          errorMessage={form.formState.errors.fullName?.message}
          classNames={{
            label: "font-medium text-black",
          }}
        />
      )}

      {action !== "reset-password" && (
        <Input
          type="email"
          label="Email"
          size="lg"
          variant="underlined"
          color="success"
          isInvalid={!!form.formState.errors.emailAddress}
          {...form.register("emailAddress")}
          errorMessage={form.formState.errors.emailAddress?.message}
          classNames={{
            label: "font-medium text-black",
          }}
        />
      )}

      {action !== "forgot-password" && (
        <Input
          type={showPassword ? "text" : "password"}
          label={
            action === "reset-password" ? "Enter New Password" : "Password"
          }
          size="lg"
          variant="underlined"
          color="success"
          isInvalid={!!form.formState.errors.password}
          {...form.register("password")}
          errorMessage={form.formState.errors.password?.message}
          endContent={
            <ToggleShow
              show={showPassword}
              setShow={setShowPassword}
              className={`${form.formState.errors.password && "text-red-500"}`}
            />
          }
          classNames={{
            label: "font-medium text-black",
          }}
        />
      )}

      {["register", "reset-password"].includes(action) && (
        <Input
          type={showConfirmPassword ? "text" : "password"}
          label={
            action === "reset-password"
              ? "Confirm New Password"
              : "Confirm Password"
          }
          size="lg"
          variant="underlined"
          color="success"
          isInvalid={!!form.formState.errors.confirmPassword}
          {...form.register("confirmPassword")}
          errorMessage={form.formState.errors.confirmPassword?.message}
          endContent={
            <ToggleShow
              show={showConfirmPassword}
              setShow={setShowConfirmPassword}
              className={`${
                form.formState.errors.confirmPassword && "text-red-500"
              }`}
            />
          }
          classNames={{
            label: "font-medium text-black",
          }}
        />
      )}

      {action === "forgot-password" && (
        <Link
          href={`/sign-in?${new URLSearchParams({
            callbackUrl: callbackUrl || "",
          }).toString()}`}
          replace={replaceHistory}
          className="text-green-500 text-sm font-medium ml-auto"
        >
          Back to Sign In
        </Link>
      )}

      {action === "login" && (
        <Link
          href={`/forgot-password?${new URLSearchParams({
            callbackUrl: callbackUrl || "",
          }).toString()}`}
          replace={replaceHistory}
          className="text-green-500 text-sm font-medium ml-auto"
        >
          Forgot Password?
        </Link>
      )}

      <Button
        type="submit"
        isDisabled={form.formState.isSubmitting}
        isLoading={form.formState.isSubmitting}
        size="lg"
        className="bg-green-500 text-white font-semibold mt-4 rounded-lg"
      >
        {form.formState.isSubmitting
          ? "Submitting..."
          : action === "register"
          ? "Create Account"
          : action === "login"
          ? "Sign In"
          : action === "forgot-password"
          ? "Receive Code"
          : "Reset Password"}
      </Button>
    </form>
  );
};

export default AuthForm;

type ShowProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
};

const ToggleShow = ({ show, setShow, className }: ShowProps) => {
  return (
    <label
      className={`text-green-500 grid place-content-center transition-colors cursor-pointer ${className}`}
    >
      {show ? (
        <FaRegEye size={20} className="relative" />
      ) : (
        <FaRegEyeSlash size={20} className="relative" />
      )}
      <input
        type="checkbox"
        name="show"
        className="hidden"
        checked={show}
        onChange={() => setShow(!show)}
      />
    </label>
  );
};
