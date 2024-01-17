import React, { memo } from "react";

import { Post, ProfilePropsType } from "components";
import { AddPostFormRedux, FormDataType } from "./AddPostForm";
import { Typography } from "antd";
export const MyPosts = memo(({ posts, addPost }: ProfilePropsType) => {
  const postsElements = posts.map((post) => {
    return (
      <li key={post.id}>
        <Post message={post.message} likesCount={post.likesCount} />
      </li>
    );
  });

  const onAddPost = (values: FormDataType) => addPost(values.newPostText);

  return (
    <div>
      <Typography.Title level={2}>My posts</Typography.Title>
      <AddPostFormRedux onSubmit={onAddPost} />
      <ul>{postsElements}</ul>
    </div>
  );
});
