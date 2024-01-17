import React, { memo } from "react";

import { NavLink } from "react-router-dom";

import userPhoto from "../../../assets/img/user.png";

import s from "./User.module.scss";
import { UserType } from "store";
import { Avatar, Button, Flex, Typography } from "antd";

type UserPropsType = {
  user: UserType;
  unfollow: (id: number) => void;
  follow: (id: number) => void;
  followingInProgress: Array<number>;
};

export const User: React.FC<UserPropsType> = memo(({ user, unfollow, follow, followingInProgress }) => {
  return (
    <article>
      <Flex gap={12} align={"center"}>
        <NavLink className={s.ava} to={"/profile/" + user.id}>
          <Avatar src={user.photos.small ? user.photos.small : userPhoto} alt="#" />
        </NavLink>
        <div className={s.content}>
          <Flex vertical>
            <Typography.Text className={s.name}>{user.name}</Typography.Text>
            {user.status && <Typography.Text>{user.status}</Typography.Text>}
          </Flex>
          {user.followed ? (
            <Button
              type={"default"}
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => unfollow(user.id)}
              htmlType={"button"}>
              Unfollow
            </Button>
          ) : (
            <Button
              type={"default"}
              disabled={followingInProgress.some((id) => id === user.id)}
              onClick={() => follow(user.id)}
              htmlType={"button"}>
              Follow
            </Button>
          )}
        </div>
      </Flex>
    </article>
  );
});
