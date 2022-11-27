import React from 'react';
import './MyPosts.css';
import Post from './Post/Post';
import {StoreType} from '../../../redux/state';
import {addPostActionCreator, updatePostTextActionCreator} from '../../../redux/profile-reducer';

const MyPosts: React.FC<StoreType> = (props) => {
    const postsElements = props._state.profilePage.posts.map(post => {
        return (
            <li className="posts__item" key={post.id}>
                <Post message={post.message} likesCount={post.likesCount}/>
            </li>
        )
    })

    const newPostElement = React.createRef<HTMLTextAreaElement>();

    const addPostChange = () => {
        const text = newPostElement.current?.value
        if (text) {
            props.dispatch(addPostActionCreator(text))
        }
    }

    const onPostChange = () => {
        const text = newPostElement.current?.value
        if (text) {
            props.dispatch(updatePostTextActionCreator(text))
        }
    }

    return (
        <div className="posts-block">
            <h1 className="page-title">My posts</h1>
            <div>
                <span>New post</span>
                <textarea ref={newPostElement} value={props._state.profilePage.newPostText} onChange={onPostChange}/>
                <button onClick={addPostChange}>Add post</button>
            </div>
            <ul className="posts">
                {postsElements}
            </ul>
        </div>
    )
}

export default MyPosts;