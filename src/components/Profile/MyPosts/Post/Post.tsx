import React from 'react'
import './Post.css'

const Post = (props: any) => {
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
        <p>{props.message}</p>
      </div>
      <button className="post__like" type="button">
        like
      </button>
    </article>
  )
}

export default Post
