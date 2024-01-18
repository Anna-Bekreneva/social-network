import React, { FC } from "react";

import { NavLink, useLocation } from "react-router-dom";
import { NavigationPropsType } from "./";
import { Avatar, Button, Flex, Menu, MenuProps, Typography } from "antd";
import { LogoutOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import s from "./Navigation.module.scss";
import classNames from "classnames";

export const Navigation: FC<Omit<NavigationPropsType, "getAva">> = ({ name, logout, ava, ...props }) => {
  const iconColor = { color: "#F46119" };
  const { pathname } = useLocation();

  const items: MenuProps["items"] = [
    {
      label: name && (
        <div className={classNames(s.item, { [s.active]: pathname === "/profile" })} key="/profile">
          <NavLink to="/profile">
            <Flex gap={"small"} align={"center"}>
              {ava && <Avatar src={ava} alt={"avatar"} />}
              <Typography.Text> {name} </Typography.Text>
            </Flex>
          </NavLink>
        </div>
      ),
      key: "profile",
    },
    {
      label: (
        <div className={classNames(s.item, { [s.active]: pathname === "/users" })} key={"/users"}>
          <NavLink to="/users">
            <UsergroupAddOutlined style={iconColor} rev={""} />
            <Typography.Text>Users</Typography.Text>
          </NavLink>
        </div>
      ),
      key: "users",
    },
  ];

  return (
    <nav {...props}>
      <Menu className={s.menu} triggerSubMenuAction={"click"} items={items} />
      {!!name && (
        <Button className={s.logout} type="link" onClick={logout}>
          <LogoutOutlined className={s.logoutContent} rev={""} />
          <Typography.Text rootClassName={s.logoutContent}> Log out</Typography.Text>
        </Button>
      )}
    </nav>
  );
};
