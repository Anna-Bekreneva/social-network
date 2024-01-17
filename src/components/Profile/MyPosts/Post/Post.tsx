import React from "react";

type PropsType = {
  message: string;
  likesCount: number;
};
export const Post: React.FC<PropsType> = ({ message, likesCount }) => {
  return (
    <article>
      <img
        src="https://bipbap.ru/wp-content/uploads/2021/07/1551512888_2-730x617.jpg"
        alt="ava"
        width=""
        height=""
        loading="lazy"
      />
      <div>
        <p>{message}</p>
      </div>
      <button type="button">like</button>
      <span>{likesCount}</span>
    </article>
  );
};
