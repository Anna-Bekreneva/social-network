import React from "react";

import { WrappedFieldProps } from "redux-form";

import styles from "./FormControls.module.css";

type TextareaProps3 = WrappedFieldProps & {
  children: any;
};

export const FormControl = ({ input, meta, children, ...props }: TextareaProps3) => {
  const hasError = meta.error && meta.touched;

  return (
    <div className={styles.formControl + " " + (hasError ? styles.error : "")}>
      {children}
      {hasError && <span>{meta.error}</span>}
    </div>
  );
};

export const Textarea = (props: TextareaProps3) => {
  const { input, meta, children, ...restProps } = props;

  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps}></textarea>
    </FormControl>
  );
};

export const Input = (props: TextareaProps3) => {
  const { input, meta, ...restProps } = props;

  return (
    <FormControl {...props}>
      <input {...input} {...restProps}></input>
    </FormControl>
  );
};
