import React from 'react';
import './MyPosts.css';
import Post from './Post/Post';
import {ProfilePropsType} from './MyPostsContainer';


const MyPosts: React.FC<ProfilePropsType> = (props) => {
	const postsElements = props.profilePage.posts.map(post => {
		return (
			<li className="posts__item" key={post.id}>
                <Post message={post.message} likesCount={post.likesCount}/>
            </li>
		);
	});

	const newPostElement = React.createRef<HTMLTextAreaElement>();

	const onAddPost = () => {
		const text = newPostElement.current?.value;
		if (text) {
			props.addPost(text)
		}
	};

	const onPostChange = () => {
		const text = newPostElement.current?.value;
		if (text) {
			props.updateNewPostText(text)
		}
	};

	return (
		<div className="posts-block">
            <h1 className="page-title">My posts</h1>
            <div>
                <span>New post</span>
                <textarea ref={newPostElement} value={props.profilePage.newPostText} onChange={onPostChange}/>
                <button onClick={onAddPost}>Add post</button>
            </div>
            <ul className="posts">
                {postsElements}
            </ul>
        </div>
	);
};

export default MyPosts;