import React, { HTMLInputTypeAttribute } from "react";

import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import { Form, Input as InputAntd, Checkbox as CheckboxAntd, Typography } from "antd";
import s from "./FormControls.module.scss";
import { FieldValidatorType } from "../../../utils";

type FormControlPropsType = {
  meta: WrappedFieldMetaProps;
  label?: string;
};

const FormControl: React.FC<FormControlPropsType> = (props) => {
  const { meta, children } = props;
  const hasError = meta.touched && meta.error;
  return (
    <Form.Item className={s.formControl + " " + (hasError ? s.error : "")} label={props?.label}>
      {children}
      {hasError && (
        <Typography.Text className={s.error} type={"danger"}>
          {meta.error}
        </Typography.Text>
      )}
    </Form.Item>
  );
};

export const Textarea: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;

  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps}></textarea>
    </FormControl>
  );
};

type InputPropsType = WrappedFieldProps & {
  type?: HTMLInputTypeAttribute;
};

export const Input: React.FC<InputPropsType> = (props) => {
  console.log(props);

  return (
    <FormControl {...props}>
      {props.type === "checkbox" ? (
        <CheckboxAntd {...props.input} {...props}>
          Remember me
        </CheckboxAntd>
      ) : props.type === "password" ? (
        <InputAntd.Password {...props.input} {...props}></InputAntd.Password>
      ) : (
        <InputAntd {...props.input} {...props}></InputAntd>
      )}
    </FormControl>
  );
};

export function createField<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: Array<FieldValidatorType>,
  component: React.FC<WrappedFieldProps>,
  props: {
    type: HTMLInputTypeAttribute;
    label?: string;
    [key: string]: unknown;
  },
) {
  return (
    <>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        label={props?.label}
        {...props}
      />
    </>
  );
}

export type GetStringKeys<T> = Extract<keyof T, string>;
