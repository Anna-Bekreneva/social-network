import React from "react";
import s from "./Preloader.module.scss";
import preloader from "../../../assets/img/loader.gif";
import { Image } from "antd";

export const Preloader = () => {
  return (
    <div className={s.container}>
      <Image width={120} height={120} src={preloader} alt={"Preloader"} placeholder={false} preview={false} />
    </div>
  );
};
