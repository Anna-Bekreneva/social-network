import React from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { InjectedFormProps, reduxForm } from "redux-form";

import style from "./../common/FormsControls/FormControls.module.css";
import s from "./Login.module.scss";
import { Card, createField, Input } from "components";
import { AppStateType, login } from "store";
import { required } from "utils";
import { Button, Form, Typography } from "antd";

type PropsType = mapDispatchPropsType & {
  captchaUrl: string | null;
};

const LoginForm: React.FC<InjectedFormProps<FormDataType, PropsType> & PropsType> = ({
  handleSubmit,
  error,
  captchaUrl,
  login,
}) => {
  const onSubmit = (formData: FormDataType) => {
    login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };
  return (
    <Form action="#" onFinish={handleSubmit(onSubmit)}>
      {createField<ValuesTypeKeys>("Email", "email", [required], Input, "Email", {
        type: "email",
        style: { flexDirection: "column" },
      })}
      {createField<ValuesTypeKeys>("Password", "password", [required], Input, "Password", {
        type: "password",
        style: { flexDirection: "column" },
      })}
      {createField<ValuesTypeKeys>(undefined, "rememberMe", [], Input, "Remember me", {
        type: "checkbox",
      })}
      {captchaUrl && <img src={captchaUrl} alt="captcha" />}
      {captchaUrl &&
        createField<ValuesTypeKeys>("Symbols from image", "captcha", [required], Input, undefined, { type: "text" })}

      {error && <span className={style.formSummaryError}>{error}</span>}
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form>
  );
};

const LoginReduxForm = reduxForm<FormDataType, PropsType>({ form: "login" })(LoginForm);

const LoginInner = (props: LoginPropsType) => {
  const handleSubmit = () => {};

  if (props.isAuth) return <Redirect to={"/profile"} />;

  return (
    <Card className={s.card}>
      <Typography.Title>Login</Typography.Title>
      <LoginReduxForm login={props.login} captchaUrl={props.captchaUrl} />
    </Card>
  );
};

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

type mapDispatchPropsType = {
  login: (email: string, password: string, rememberMe: boolean, captchaUrl: string | null) => void;
};

type mapStateToPropsType = {
  captchaUrl: string | null;
  isAuth: boolean;
};

type FormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha: string;
};

type LoginPropsType = mapStateToPropsType & mapDispatchPropsType;
type ValuesTypeKeys = Extract<keyof FormDataType, string>;

export const Login = connect(mapStateToProps, { login })(LoginInner);
