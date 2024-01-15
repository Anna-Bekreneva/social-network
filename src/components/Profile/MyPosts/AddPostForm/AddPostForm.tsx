import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";

import { createField, GetStringKeys, Textarea } from "../../../common";
import { required } from "../../../../utils";

type ValuesTypeKeys = GetStringKeys<FormDataType>;
export type FormDataType = {
  newPostText: string;
};
const AddPostForm: React.FC<InjectedFormProps<FormDataType>> = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<ValuesTypeKeys>("Your post", "newPostText", [required], Textarea, {
        type: "text",
        label: "ADd your post",
      })}
      <button>Add post</button>
    </form>
  );
};

export const AddPostFormRedux = reduxForm<FormDataType>({
  form: "profileAddNewPostForm",
})(AddPostForm);
