import React from "react";
import "./Post.css";

type PropsType = {
  message: string;
  likesCount: number;
};
export const Post: React.FC<PropsType> = ({ message, likesCount }) => {
  return (
    <article className="post">
      <img
        className="post__img"
        src="https://bipbap.ru/wp-content/uploads/2021/07/1551512888_2-730x617.jpg"
        alt="ava"
        width=""
        height=""
        loading="lazy"
      />
      <div className="post__text">
        <p>{message}</p>
      </div>
      <button className="post__like" type="button">
        like
      </button>
      <span>{likesCount}</span>
    </article>
  );
};
