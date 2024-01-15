import React, { memo } from "react";
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

export const Users: React.FC<UsersPropsType> = memo(
  ({
    users,
    follow,
    unfollow,
    followingInProgress,
    totalUsersCount,
    onFilterChanged,
    onPageChanged,
    pageSize,
    currentPage,
  }) => {
    return (
      <div>
        <UsersSearchForm onFilterChanged={onFilterChanged} />
        <Paginator
          currentPage={currentPage}
          onPageChanged={onPageChanged}
          pageSize={pageSize}
          totalItemsCount={totalUsersCount}
          portionSize={10}></Paginator>

        {users.map((user) => (
          <User
            user={user}
            follow={follow}
            followingInProgress={followingInProgress}
            unfollow={unfollow}
            key={user.id}
          />
        ))}
      </div>
    );
  },
);
