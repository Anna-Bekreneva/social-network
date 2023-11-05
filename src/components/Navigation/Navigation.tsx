import React, { FC } from "react";

import { NavLink } from "react-router-dom";
import { NavigationPropsType } from "./";
import { Button, Menu, Flex, Avatar } from "antd";
import MenuItem from "antd/lib/menu/MenuItem";
import { LogoutOutlined } from "@ant-design/icons";

export const Navigation: FC<NavigationPropsType> = ({ login, ava, logout }) => {
  return (
    <nav className="navigation">
      <Menu className="navigation__items">
        {login && (
          <MenuItem key={"1"}>
            <NavLink className="navigation__link" to="/profile">
              <Flex gap={"small"} align={"center"}>
                <Avatar src={ava} alt={"avatar"} />
                <span> {login} </span>
              </Flex>
            </NavLink>
          </MenuItem>
        )}
        <MenuItem key={"2"}>
          <NavLink className="navigation__link" to="/users">
            Users
          </NavLink>
        </MenuItem>
        <MenuItem key={"3"}>
          <NavLink className="navigation__link" to="/dialogs">
            Message
          </NavLink>
        </MenuItem>
      </Menu>
      {!!login && (
        <Button type="primary" onClick={logout}>
          <LogoutOutlined rev />
          Log out
        </Button>
      )}
    </nav>
  );
};
