import React from "react";

import { NavLink } from "react-router-dom";

import s from "./../Dialogs.module.css";

type DialogItemType = {
  id: number;
  name: string;
};

export const DialogItem: React.FC<DialogItemType> = ({ id, name }) => {
  return (
    <li className={s.dialogs_item + " " + s.dialogs_item_active}>
      <NavLink to={"/dialogs/" + id}>{name}</NavLink>
    </li>
  );
};
