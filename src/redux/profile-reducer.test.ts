import profileReducer, {addPostActionCreator, deletePost, ProfilePageType} from "redux/profile-reducer";

const initialState: ProfilePageType = {
	posts: [
		{id: 1, message: 'Hi, how are you?', likesCount: 12},
		{id: 2, message: 'It\'s, my first post?', likesCount: 11},
		{id: 3, message: 'Blabla', likesCount: 11},
		{id: 4, message: 'Dadada', likesCount: 11}
	],
	profile: {
		aboutMe: '',
		userId: 0,
		lookingForAJobDescription: '',
		fullName: '',
		contacts: {
			youtube: '',
			website: '',
			vk: '',
			twitter: '',
			mainLink: '',
			instagram: '',
			github: '',
			facebook: '',
		},
		lookingForAJob: false,
		photos: {
			small: '',
			large: ''
		},
		status: 'string',
	},
};

test('new post should be added', () => {
	let action = addPostActionCreator('test')

	let newState = profileReducer(initialState, action)

	expect(newState.posts.length).toBe(5)
})

test('message of new post should be correct', () => {
	let action = addPostActionCreator('test')

	let newState = profileReducer(initialState, action)

	expect(newState.posts[4].message).toBe('test')
})

test('after deleting length of messages should be decrement', () => {
	let action = deletePost(1)

	let newState = profileReducer(initialState, action)

	expect(newState.posts.length).toBe(3)
})

test('after deleting length shouldn\'t be decrement if id is incorrect', () => {
	let action = deletePost(1000)

	let newState = profileReducer(initialState, action)

	expect(newState.posts.length).toBe(4)
})