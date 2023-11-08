import { Card as CardAntd } from "antd";
import s from "./Card.module.scss";
import { ComponentPropsWithoutRef } from "react";

export const Card = ({ children, ...props }: ComponentPropsWithoutRef<"div">) => {
  return (
    <CardAntd className={s.card} {...props}>
      {children}
    </CardAntd>
  );
};
