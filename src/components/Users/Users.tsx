import React from 'react'

import { Paginator, User } from 'components'
import { UserType } from 'store'

type UsersPropsType = {
  totalUsersCount: number
  pageSize: number
  currentPage: number
  onPageChanged: (page: number) => void
  users: Array<UserType>
  unfollow: (id: number) => void
  follow: (id: number) => void
  followingInProgress: Array<number>
  toggleIsFollowingProgress: (followingInProgress: boolean, id: number) => void
}

export const Users: React.FC<UsersPropsType> = props => {
  return (
    <div>
      <Paginator
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
        pageSize={props.pageSize}
        totalItemsCount={props.totalUsersCount}
        portionSize={10}
      ></Paginator>

      {props.users.map(user => (
        <User
          user={user}
          follow={props.follow}
          followingInProgress={props.followingInProgress}
          unfollow={props.unfollow}
          key={user.id}
        ></User>
      ))}
    </div>
  )
}
