import { Field, Form, Formik } from "formik";
import React from "react";
import { FilterType } from "../../store";

const usersSearchFormValidate = (values: any) => {
  const errors = {};
  return errors;
};

type FormType = {
  term: string;
  friend: "true" | "false" | "null";
};

type PropsType = { onFilterChanged: (filter: FilterType) => void };

// todo: all components wrap in memo
export const UsersSearchForm: React.FC<PropsType> = (props) => {
  const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const filter = {
      term: values.term,
      friend: values.friend === "null" ? null : values.friend === "true",
    };
    props.onFilterChanged(filter);
    setSubmitting(false);
  };
  return (
    <div>
      <Formik initialValues={{ term: "", friend: "null" }} validate={usersSearchFormValidate} onSubmit={submit}>
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="term" />
            <Field name="friends" as="select">
              <option value="all">All</option>
              <option value="true">Only followed</option>
              <option value="false">Only unfollowed</option>
            </Field>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
