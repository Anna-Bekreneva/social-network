import React from 'react';
import './MyPosts.css';
import {addPostActionCreator, updatePostTextActionCreator} from '../../../redux/profile-reducer';
import MyPosts from './MyPosts';
import {PropsType} from '../../../App';
import StoreContext from '../../../StoreContext';

const MyPostsContainer: React.FC<PropsType> = (props) => {
	const addPost = (text: string) => props.dispatch(addPostActionCreator(text));
	const onPostChange = (text: string) => props.dispatch(updatePostTextActionCreator(text));

	return (
		<StoreContext.Consumer>
			{
				(store) => (<MyPosts dispatch={props.dispatch} state={store.profile} updateNewPostText={onPostChange} addPost={addPost}/>)
			}
		</StoreContext.Consumer>
	)
};

export default MyPostsContainer;