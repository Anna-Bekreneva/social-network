import React from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { InjectedFormProps, reduxForm } from "redux-form";

import style from "./../common/FormsControls/FormControls.module.css";

import { Card, createField, Input } from "components";
import { AppStateType, login } from "store";
import { required } from "utils";

type PropsType = {
  captchaUrl: string | null;
};

const LoginForm: React.FC<InjectedFormProps<FormDataType, PropsType> & PropsType> = ({
  handleSubmit,
  error,
  captchaUrl,
}) => {
  return (
    <form action="#" onSubmit={handleSubmit}>
      {/* Подумать над лейблами */}
      {createField<ValuesTypeKeys>("Email", "email", [required], Input)}
      {createField<ValuesTypeKeys>("Password", "password", [required], Input, { type: "password" })}
      {createField<ValuesTypeKeys>(undefined, "rememberMe", [], Input, { type: "checkbox" }, "Remember me")}

      {captchaUrl && <img src={captchaUrl} alt="captcha" />}
      {captchaUrl && createField<ValuesTypeKeys>("Symbols from image", "captcha", [required], Input, {})}

      {error && <span className={style.formSummaryError}>{error}</span>}
      <button type="submit">Login</button>
    </form>
  );
};

const LoginReduxForm = reduxForm<FormDataType, PropsType>({ form: "login" })(LoginForm);

const LoginInner = (props: LoginPropsType) => {
  const onSubmit = (formData: FormDataType) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if (props.isAuth) return <Redirect to={"/profile"} />;

  return (
    <Card>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
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
