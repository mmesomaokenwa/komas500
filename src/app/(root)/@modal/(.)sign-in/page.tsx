import AuthForm from "@/components/AuthPages/AuthForm";
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
  callbackUrl: z.string().optional(),
});

const InterceptedSignIn = ({ searchParams }: PropsType) => {
  const { data } = schema.safeParse(searchParams)
  return (
    <InterceptModal>
      <ModalHeader className="text-2xl text-center font-bold mb-2">
        Sign in to continue
      </ModalHeader>
      <ModalBody>
        <AuthForm
          action="login"
          callbackUrl={data?.callbackUrl}
          replaceHistory
        />
      </ModalBody>
      <ModalFooter className="justify-start">
        <p>
          Don't have an account?{" "}
          <Link
            replace
            href={`/sign-up?${new URLSearchParams({
              callbackUrl: data?.callbackUrl || "",
            }).toString()}`}
            className="text-green-500"
          >
            Sign Up
          </Link>
        </p>
      </ModalFooter>
    </InterceptModal>
  );
}

export default InterceptedSignIn