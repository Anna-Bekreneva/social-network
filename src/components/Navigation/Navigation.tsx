import React, { FC } from "react";

import { NavLink, useLocation } from "react-router-dom";
import { NavigationPropsType } from "./";
import { Avatar, Button, Flex, Menu, Typography } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import { LogoutOutlined, MessageOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import s from "./Navigation.module.scss";
import classNames from "classnames";

export const Navigation: FC<Omit<NavigationPropsType, "getAva">> = ({ name, logout, ava, ...props }) => {
  const iconColor = { color: "#F46119" };
  const { pathname } = useLocation();
  return (
    <nav {...props}>
      <Menu className={s.menu} triggerSubMenuAction={"click"}>
        {name && (
          <MenuItem className={classNames(s.item, { [s.active]: pathname === "/profile" })} key={"/profile"}>
            <NavLink to="/profile">
              <Flex gap={"small"} align={"center"}>
                {ava && <Avatar src={ava} alt={"avatar"} />}
                <Typography.Text> {name} </Typography.Text>
              </Flex>
            </NavLink>
          </MenuItem>
        )}
        <MenuItem className={classNames(s.item, { [s.active]: pathname === "/users" })} key={"/users"}>
          <NavLink to="/users">
            <UsergroupAddOutlined style={iconColor} rev={""} />
            <Typography.Text>Users</Typography.Text>
          </NavLink>
        </MenuItem>
        <MenuItem className={classNames(s.item, { [s.active]: pathname === "/dialogs" })} key={"/dialogs"}>
          <NavLink to="/dialogs">
            <MessageOutlined style={iconColor} rev={""} />
            <Typography.Text>Message</Typography.Text>
          </NavLink>
        </MenuItem>
      </Menu>
      {!!name && (
        <Button className={s.logout} type="link" onClick={logout}>
          <LogoutOutlined className={s.logoutContent} rev={""} />
          <Typography.Text rootClassName={s.logoutContent}> Log out</Typography.Text>
        </Button>
      )}
    </nav>
  );
};
