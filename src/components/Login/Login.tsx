import React from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { InjectedFormProps, reduxForm } from "redux-form";

import s from "./Login.module.scss";
import { Card, createField, GetStringKeys, Input } from "components";
import { AppStateType, login, selectCaptchaUrl, selectIsAuth } from "store";
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
    <Form action="#" onFinish={handleSubmit(onSubmit)} layout={"vertical"}>
      {createField<ValuesTypeKeys>("email", "email", [required], Input, { type: "email", label: "Enter email" })}
      {createField<ValuesTypeKeys>("password", "password", [required], Input, {
        type: "password",
        label: "Enter password",
      })}
      {createField<ValuesTypeKeys>(undefined, "rememberMe", [], Input, {
        type: "checkbox",
        checkBoxLabel: "Remember me",
      })}
      {captchaUrl && <img src={captchaUrl} alt="captcha" />}
      {captchaUrl && createField<ValuesTypeKeys>("symbols from image", "captcha", [required], Input, { type: "text" })}

      {error && (
        <Typography.Text type={"danger"} className={s.error}>
          {error}
        </Typography.Text>
      )}
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form>
  );
};

const LoginReduxForm = reduxForm<FormDataType, PropsType>({ form: "login" })(LoginForm);

const LoginInner: React.FC<LoginPropsType> = ({ login, isAuth, captchaUrl }) => {
  if (isAuth) return <Redirect to={"/profile"} />;

  return (
    <Card className={s.card}>
      <Typography.Title>Login</Typography.Title>
      <LoginReduxForm login={login} captchaUrl={captchaUrl} />
    </Card>
  );
};

const mapStateToProps = (state: AppStateType): mapStateToPropsType => ({
  captchaUrl: selectCaptchaUrl(state),
  isAuth: selectIsAuth(state),
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
type ValuesTypeKeys = GetStringKeys<FormDataType>;

export const Login = connect(mapStateToProps, { login })(LoginInner);
