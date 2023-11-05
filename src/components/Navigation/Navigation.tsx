import React, { FC } from "react";

import { NavLink } from "react-router-dom";
import { NavigationPropsType } from "./";
import { Button, Menu, Flex, Avatar, Typography } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import {LogoutOutlined, MessageOutlined, UsergroupAddOutlined} from "@ant-design/icons";
import s from './Navigation.module.scss'

export const Navigation: FC<NavigationPropsType> = ({ name, ava, logout }) => {
  const iconColor = {color: "#F46119"}
  return (
    <nav>
      <Menu className={s.menu}>
        {name && (
          <MenuItem key={name}>
            <NavLink to="/profile">
              <Flex gap={"small"} align={"center"}>
                <Avatar src={ava} alt={"avatar"} />
                <Typography.Text > {name} </Typography.Text>
              </Flex>
            </NavLink>
          </MenuItem>
        )}
        <MenuItem key={"Users"}>
          <NavLink to="/users">
            <UsergroupAddOutlined style={iconColor} rev/>
            <Typography.Text>Users</Typography.Text>
          </NavLink>
        </MenuItem>
        <MenuItem key={"Message"}>
          <NavLink to="/dialogs">
            <MessageOutlined style={iconColor} rev/>
            <Typography.Text>Message</Typography.Text>
          </NavLink>
        </MenuItem>
      </Menu>
      {!!name && (
        <Button className={s.logout} type="link" onClick={logout}>
          <LogoutOutlined className={s.logoutContent} rev />
          <Typography.Text rootClassName={s.logoutContent}> Log out</Typography.Text>
        </Button>
      )}
    </nav>
  );
};
