import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import { maxLengthCreator, required } from "utils";
import { Button } from "antd";
import { createField, Textarea } from "components";

const maxLength100 = maxLengthCreator(100);
export const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormDataType>> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<ValuesTypeKeys>("Enter your message", "newMessageBody", [required, maxLength100], Textarea, {
        type: "email",
        label: "Enter email",
      })}
      <Button type="primary" htmlType="submit">
        Send
      </Button>
    </form>
  );
};

export const AddMessageFormRedux = reduxForm<AddMessageFormDataType>({
  form: "dialogAddMessageForm",
})(AddMessageForm);

type ValuesTypeKeys = Extract<keyof AddMessageFormDataType, string>;

export type AddMessageFormDataType = {
  newMessageBody: string;
};
