import { User } from '@/lib/types'
import { Avatar } from '@nextui-org/react'
import React from 'react'

type PropsType = {
  user: User
  description: keyof User
}

const UserAutocompleteCard = ({ user, description }: PropsType) => {
  return (
    <div className="flex gap-2 items-center">
      <Avatar
        alt={user.fullName}
        className="flex-shrink-0"
        size="sm"
        src={user.profileUrl}
      />
      <div className="flex flex-col">
        <span className="text-small">{user.fullName}</span>
        <span className="text-tiny text-default-400">{user[description]?.toString()}</span>
      </div>
    </div>
  );
}

export default UserAutocompleteCard