import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";

// Почему пути такие длинные
import { required } from "../../../../utils";
import { createField, GetStringKeys, Input } from "../../../common";

type ValuesTypeKeys = GetStringKeys<FormDataType>;
export type FormDataType = {
  newPostText: string;
};
const AddPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      {/* А разве тут не textarea */}
      {createField<ValuesTypeKeys>("Your post", "newPostText", [required], Input, {
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
