import React, { FC } from "react";
import { Button } from "antd";
import s from "./Social.module.scss";

type Props = {
  title: string;
  value: string;
};
export const Social: FC<Props> = ({ title, value }) => {
  console.log(value);
  if (!value) return null;
  return (
    <li className={s.item}>
      <Button type={"link"} href={value} target="_blank">
        {title}
      </Button>
    </li>
  );
};
