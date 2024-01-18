import React, { HTMLInputTypeAttribute } from "react";

import { Field, WrappedFieldMetaProps, WrappedFieldProps } from "redux-form";
import { Form, Input as InputAntd, Checkbox as CheckboxAntd, Typography, Input as InputForTextarea } from "antd";
import s from "./FormControls.module.scss";
import { FieldValidatorType } from "../../../utils";
const { TextArea } = InputForTextarea;

type FormControlPropsType = WrappedFieldProps & {
  meta: WrappedFieldMetaProps;
  label?: string;
};

export const FormControl: React.FC<FormControlPropsType> = (props) => {
  const { meta, children } = props;
  const hasError = meta.touched && meta.error;

  console.log(meta);

  return (
    <Form.Item className={`${hasError ? s.errorField : ""}`} label={props.label} name={props.input.name}>
      {children}
      {hasError && (
        <Typography.Text className={s.error} type={"danger"}>
          {meta.error}
        </Typography.Text>
      )}
    </Form.Item>
  );
};

export const Textarea: React.FC<Omit<InputPropsType, "type">> = ({ label, input, meta, ...props }) => {
  return (
    <FormControl label={label} input={input} meta={meta} {...props}>
      <TextArea className={s.textarea} {...input} {...props} />
    </FormControl>
  );
};

type InputPropsType = WrappedFieldProps & {
  type?: HTMLInputTypeAttribute;
  label?: string;
};

export const Input: React.FC<InputPropsType> = ({ label, input, meta, ...props }) => {
  return (
    <>
      {props.type === "checkbox" ? (
        <div className={s.container}>
          <FormControl label={label} input={input} meta={meta} {...props}>
            <CheckboxAntd {...input} {...props} />
          </FormControl>
        </div>
      ) : (
        <FormControl label={label} input={input} meta={meta} {...props}>
          {props.type === "password" ? (
            <InputAntd.Password {...input} {...props} />
          ) : (
            <InputAntd {...input} {...props} />
          )}
        </FormControl>
      )}
    </>
  );
};

export function createField<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: Array<FieldValidatorType>,
  component: React.FC<WrappedFieldProps>,
  props: {
    type?: HTMLInputTypeAttribute;
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
