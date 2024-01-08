import React from "react";

import { Paginator, User } from "components";
import { FilterType, UserType } from "store";
import { UsersSearchForm } from "./UsersSearchForm";

type UsersPropsType = {
  totalUsersCount: number;
  pageSize: number;
  currentPage: number;
  onPageChanged: (page: number) => void;
  onFilterChanged: (filter: FilterType) => void;
  users: Array<UserType>;
  unfollow: (id: number) => void;
  follow: (id: number) => void;
  followingInProgress: Array<number>;
};

export const Users: React.FC<UsersPropsType> = (props) => {
  return (
    <div>
      <UsersSearchForm onFilterChanged={props.onFilterChanged} />
      <Paginator
        currentPage={props.currentPage}
        onPageChanged={props.onPageChanged}
        pageSize={props.pageSize}
        totalItemsCount={props.totalUsersCount}
        portionSize={10}></Paginator>

      {props.users.map((user) => (
        <User
          user={user}
          follow={props.follow}
          followingInProgress={props.followingInProgress}
          unfollow={props.unfollow}
          key={user.id}></User>
      ))}
    </div>
  );
};
