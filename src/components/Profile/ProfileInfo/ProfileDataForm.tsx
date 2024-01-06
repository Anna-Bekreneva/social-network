import React from "react";

import { Field, InjectedFormProps, reduxForm } from "redux-form";

import { createField, GetStringKeys, Input, ProfileType, Textarea } from "components";
import style from "components/common/FormsControls/FormControls.module.scss";

type ProfileTypeKeys = GetStringKeys<ProfileType>;

type PropsType = {
  profile: ProfileType;
};

const ProfileDataForm: React.FC<InjectedFormProps<ProfileType, PropsType> & PropsType> = ({
  handleSubmit,
  profile,
  error,
}) => {
  return (
    <form action={"#"} onSubmit={handleSubmit}>
      <button type={"submit"}>save</button>
      {error && <span className={style.formSummaryError}>{error}</span>}
      <div>
        <p>Full name: {createField<ProfileTypeKeys>("Full name", "fullName", [], Input, { type: "text" })}</p>

        <p>Looking for a job: {<Field component={Input} name="lookingForAJob" type="checkbox" />}</p>

        <p>
          My professional skills:{" "}
          {<Field component={Textarea} placeholder="My professional skills" name="lookingForAJobDescription" />}
        </p>

        <p>About me: {<Field component={Textarea} placeholder="About me" name="aboutMe" />}</p>

        <div>
          Contacts:
          {Object.keys(profile.contacts).map((key) => {
            return (
              <div key={key} className={"s.contact"}>
                {key}: {createField(key, "contacts." + key, [], Input, { type: "text" })}
              </div>
            );
          })}
        </div>
      </div>
    </form>
  );
};

export const ProfileDataFormReduxForm = reduxForm<ProfileType, PropsType>({ form: "edit-profile" })(ProfileDataForm);
