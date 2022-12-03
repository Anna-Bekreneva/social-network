import React from 'react';
import './MyPosts.css';
import {addPostActionCreator, updatePostTextActionCreator} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {PropsType} from '../../../App';

const MyPostsContainer: React.FC<PropsType> = (props) => {
	const addPost = (text: string) => props.dispatch(addPostActionCreator(text));
	const onPostChange = (text: string) => props.dispatch(updatePostTextActionCreator(text));

	return <MyPosts dispatch={props.dispatch} state={props.state.profile} updateNewPostText={onPostChange} addPost={addPost}/>
};

export default MyPostsContainer;