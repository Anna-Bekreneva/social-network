import { Flex, Image, Typography } from "antd";
import errorImg from "../../assets/img/404.png";
import React from "react";

export const ErrorPage = () => {
  return (
    <Flex align={"center"} justify={"center"} vertical>
      <h1 className={'sr-only'}>404 page</h1>
      <Image width={505} height={224} src={errorImg} alt={"404"} placeholder={false} preview={false} />
    </Flex>
  )
}