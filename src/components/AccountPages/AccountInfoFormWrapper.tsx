import React from 'react'
import AccountInfoForm from './AccountInfoForm'
import { getUser } from '@/lib/server-actions/user'

type PropsType = {
  isIntercepted?: boolean
}

const AccountInfoFormWrapper = async ({ isIntercepted }: PropsType) => {
  const data = await getUser();

  const user = data.data;
  
  return <AccountInfoForm user={user} isIntercepted={isIntercepted} />
}

export default AccountInfoFormWrapper