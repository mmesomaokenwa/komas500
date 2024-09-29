import AuthForm from "@/components/AuthPages/AuthForm";
import ForgotPasswordOtp from "@/components/AuthPages/ForgotPasswordOtp";
import InterceptModal from "@/components/General/InterceptModal";
import { ModalBody, ModalFooter, ModalHeader } from "@nextui-org/react";
import Link from "next/link";
import React, { CSSProperties } from "react";
import { z } from "zod";

type PropsType = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const schema = z.object({
  email: z.string().email().optional(),
  callbackUrl: z.string().optional(),
});

const InterceptedForgotPassword = ({ searchParams }: PropsType) => {
  const { data } = schema.safeParse(searchParams)
  return (
    <InterceptModal>
      <ModalHeader className="text-2xl text-center font-bold mb-2">
        {data?.email ? "Enter Verification Code" : "Forgot Password"}
      </ModalHeader>
      <ModalBody>
        {data?.email ? (
          <ForgotPasswordOtp
            email={data?.email}
            callbackUrl={data?.callbackUrl}
            replaceHistory
          />
        ) : (
          <AuthForm
            action="forgot-password"
            callbackUrl={data?.callbackUrl}
            replaceHistory
          />
        )}
      </ModalBody>
      <ModalFooter className="justify-start">
        <p>
          Don't have an account?{" "}
          <Link
            href={`/sign-up?${new URLSearchParams({
              callbackUrl: data?.callbackUrl || "",
            }).toString()}`}
            replace
            className="text-green-500"
          >
            Sign Up
          </Link>
        </p>
      </ModalFooter>
    </InterceptModal>
  );
};

export default InterceptedForgotPassword;
