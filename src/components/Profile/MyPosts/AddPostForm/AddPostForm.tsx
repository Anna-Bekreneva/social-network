import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";

import { createField, GetStringKeys, Textarea } from "../../../common";
import { required } from "../../../../utils";
import { Button, Form } from "antd";
import s from "./AddPostForm.module.scss";

type ValuesTypeKeys = GetStringKeys<FormDataType>;

type Props = {
  onSubmit: (value: FormDataType) => void;
};

export type FormDataType = {
  newPostText: string;
};
const AddPostForm: React.FC<InjectedFormProps<FormDataType, Props> & Props> = ({ handleSubmit, onSubmit }) => {
  return (
    <Form className={s.form} onFinish={handleSubmit(onSubmit)} layout={"vertical"}>
      {/* todo: work on id */}
      {createField<ValuesTypeKeys>("Your post", "newPostText", [required], Textarea, {
        type: "text",
        label: "Add your post",
      })}
      <Button type={"primary"} htmlType={"submit"}>
        Add new post
      </Button>
    </Form>
  );
};

export const AddPostFormRedux = reduxForm<FormDataType, Props>({
  form: "profileAddNewPostForm",
})(AddPostForm);
