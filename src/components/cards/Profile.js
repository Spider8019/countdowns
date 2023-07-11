import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { Avatar } from 'primereact/avatar'

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0()

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    isAuthenticated && (
      <div className="flex gap-4 items-center">
        <Avatar image={user.picture} size="xlarge" shape="circle" />
        <div>
          <h2>{user.name}</h2>
          <p className="text-sm truncate">{user.email}</p>
        </div>
      </div>
    )
  )
}

export default Profile
