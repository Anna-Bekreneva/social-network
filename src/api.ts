import axios from 'axios';

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		"API-kEY" : "249ba22a-40e2-4469-a783-dd0a8a09df63"
	}
})

export const usersAPI = {
	getUsers: (currentPage: number, pageSize: number) => {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`, {
			withCredentials: true
		})
		.then(response => {
			return response.data
		})
	}
}