import React, { memo } from "react";

import "./MyPosts.css";
import { Field, InjectedFormProps, reduxForm } from "redux-form";

import { ProfilePropsType, Post, Textarea } from "components";
import { maxLengthCreator, required } from "utils";

type FormDataType = {
  newPostText: string;
};

const maxLength10 = maxLengthCreator(10);

export const MyPosts = memo((props: ProfilePropsType) => {
  const postsElements = props.profilePage.posts.map((post) => {
    return (
      <li className="posts__item" key={post.id}>
        <Post message={post.message} likesCount={post.likesCount} />
      </li>
    );
  });

  const onAddPost = (values: FormDataType) => {
    props.addPost(values.newPostText);
  };

  return (
    <div className="posts-block">
      <h1 className="page-title">My posts</h1>
      <div>
        <span>New post</span>
        <AddNewPostFormRedux onSubmit={onAddPost} />
      </div>
      <ul className="posts">{postsElements}</ul>
    </div>
  );
});

const AddNewPostForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={Textarea}
        validate={[required, maxLength10]}
        name={"newPostText"}
        placeholder={"post message"}></Field>
      <button>Add post</button>
    </form>
  );
};

export const AddNewPostFormRedux = reduxForm<FormDataType>({
  form: "profileAddNewPostForm",
})(AddNewPostForm);
