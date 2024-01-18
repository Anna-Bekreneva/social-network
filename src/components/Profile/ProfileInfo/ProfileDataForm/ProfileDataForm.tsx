import React from "react";

import { InjectedFormProps, reduxForm } from "redux-form";
import { createField, GetStringKeys, Input, ProfileType, Textarea } from "components/index";
import { Button, Form, Typography } from "antd";

type ProfileTypeKeys = GetStringKeys<ProfileType>;

type PropsType = {
  profile: ProfileType;
  onSubmit: (formData: ProfileType) => void;
};

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({
  handleSubmit,
  profile,
  onSubmit,
  error,
}) => {
  return (
    <Form action={"#"} onFinish={handleSubmit(onSubmit)} layout={"vertical"}>
      {error && <Typography.Text type={"danger"}>{error}</Typography.Text>}
      {createField<ProfileTypeKeys>(undefined, "fullName", [], Input, {
        type: "text",
        label: "Full name:",
      })}

      {createField<ProfileTypeKeys>(undefined, "aboutMe", [], Textarea, { label: "About me:" })}

      {createField<ProfileTypeKeys>(undefined, "lookingForAJob", [], Input, {
        type: "checkbox",
        label: "Looking for a job",
      })}

      {createField<ProfileTypeKeys>(undefined, "lookingForAJobDescription", [], Textarea, {
        label: "My professional skills:",
      })}

      {Object.keys(profile.contacts).map((key) => {
        return <div key={key}>{createField(key, "contacts." + key, [], Input, { type: "text", label: key })}</div>;
      })}
      <Button type={"primary"} htmlType="submit" disabled={!!error}>
        Save settings
      </Button>
    </Form>
  );
};

export const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({ form: "edit-profile" })(ProfileDataForm);
