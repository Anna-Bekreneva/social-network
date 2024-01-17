import { Formik, useFormik } from "formik";
import React, { memo } from "react";
import { FilterType } from "../../../store";
import { Button, Form, Input, Select } from "antd";
import s from "./UsersSearchForm.module.scss";
const usersSearchFormValidate = () => {
  const errors = {};
  return errors;
};

type FormType = {
  term: string;
  friend: "true" | "false" | "null";
};

type PropsType = { onFilterChanged: (filter: FilterType) => void };

export const UsersSearchForm: React.FC<PropsType> = memo(({ onFilterChanged }) => {
  const submit = (values: FormType, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    const filter = {
      term: values.term,
      friend: values.friend === "null" ? null : values.friend === "true",
    };
    onFilterChanged(filter);
    setSubmitting(false);
  };

  const formik = useFormik<FormType>({
    initialValues: { term: "", friend: "null" },
    onSubmit: submit,
    validate: usersSearchFormValidate,
  });

  return (
    <Formik initialValues={{ term: "", friend: "null" }} validate={usersSearchFormValidate} onSubmit={submit}>
      {({ isSubmitting }) => (
        <Form className={s.form} onFinish={formik.handleSubmit}>
          <Form.Item<FormType> className={`${s.search} ${s.item}`} label="Search by name" name="term">
            <Input
              placeholder={"Anna"}
              name="term"
              onChange={(value) => formik.setFieldValue("term", value.currentTarget.value)}
            />
          </Form.Item>
          <Form.Item<FormType> className={s.item} name="friend">
            <Select
              defaultValue="all"
              style={{ width: 120 }}
              onChange={(value) => formik.setFieldValue("friend", value)}
              options={[
                { value: "all", label: "All" },
                { value: "true", label: "Only followed" },
                { value: "false", label: "Only unfollowed" },
              ]}
            />
          </Form.Item>
          <Button type="primary" htmlType={"submit"} disabled={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
});
