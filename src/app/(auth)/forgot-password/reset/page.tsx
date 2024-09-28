import AuthForm from '@/components/AuthPages/AuthForm';
import React from 'react'
import { z } from 'zod';

type PropsType = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const schema = z.object({
  redirect: z.string().optional(),
  code: z.string(),
});

const ResetPassword = ({ searchParams }: PropsType) => {
  const { data } = schema.safeParse(searchParams)
  return (
    <div className="flex items-center justify-center flex-1 p-4 bg-white">
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        <p className="text-2xl text-center font-bold mb-2">New Password</p>
        <AuthForm action="reset-password" redirect={data?.redirect} resetPasswordCode={data?.code}  />
      </div>
    </div>
  );
}

export default ResetPassword