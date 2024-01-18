import React, { memo } from "react";
import { User } from "components";
import { FilterType, UserType } from "store";
import { UsersSearchForm } from "./UsersSearchForm";
import s from "./Users.module.scss";
import { Pagination } from "antd";
import { Redirect } from "react-router-dom";

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
  isAuth: boolean;
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
    isAuth,
  }) => {
    if (!isAuth) {
      return <Redirect to={"/login"} />;
    }

    return (
      <div>
        <h1 className={"sr-only"}>Users</h1>
        <UsersSearchForm onFilterChanged={onFilterChanged} />

        {!!users.length && (
          <ul className={s.users}>
            {users.map((user) => (
              <li className={s.user} key={user.id}>
                <User user={user} follow={follow} followingInProgress={followingInProgress} unfollow={unfollow} />
              </li>
            ))}
          </ul>
        )}
        <Pagination
          className={s.pagination}
          onChange={(page, pageSize) => onPageChanged(page)}
          total={Math.ceil(totalUsersCount / pageSize)}
          current={currentPage}
          pageSize={pageSize}
          hideOnSinglePage
          showSizeChanger={false}
        />
      </div>
    );
  },
);
