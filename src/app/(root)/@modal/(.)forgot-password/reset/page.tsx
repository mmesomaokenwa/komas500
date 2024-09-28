import AuthForm from "@/components/AuthPages/AuthForm";
import InterceptModal from "@/components/General/InterceptModal";
import { ModalBody, ModalHeader } from "@nextui-org/react";
import React, { CSSProperties } from "react";
import { z } from "zod";

type PropsType = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const schema = z.object({
  redirect: z.string().optional(),
});

const InterceptedResetPassword = ({ searchParams }: PropsType) => {
  const { data } = schema.safeParse(searchParams)
  return (
    <InterceptModal>
      <ModalHeader className="text-2xl text-center font-bold mb-2">
        New Password
      </ModalHeader>
      <ModalBody>
        <AuthForm
          action="reset-password"
          redirect={data?.redirect}
          replaceHistory
        />
      </ModalBody>
    </InterceptModal>
  );
};

export default InterceptedResetPassword;
