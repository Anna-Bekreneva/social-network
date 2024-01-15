import React, { memo } from "react";

import "./MyPosts.css";

import { ProfilePropsType, Post } from "components";
import { AddPostFormRedux, FormDataType } from "./AddPostForm";
export const MyPosts = memo(({ posts, addPost }: ProfilePropsType) => {
  const postsElements = posts.map((post) => {
    return (
      <li className="posts__item" key={post.id}>
        <Post message={post.message} likesCount={post.likesCount} />
      </li>
    );
  });

  const onAddPost = (values: FormDataType) => addPost(values.newPostText);

  return (
    <div className="posts-block">
      <h1 className="page-title">My posts</h1>
      <div>
        <span>New post</span>
        <AddPostFormRedux onSubmit={onAddPost} />
      </div>
      <ul className="posts">{postsElements}</ul>
    </div>
  );
});
