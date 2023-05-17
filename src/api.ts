import axios from 'axios';

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	headers: {
		// "API-kEY" : "249ba22a-40e2-4469-a783-dd0a8a09df63"
		"API-kEY" : "f7924403-26c6-4ed7-ac40-d679f3c4cd6f"
	}
})

export const profileAPI = {
	getProfile(userId: number) {
		return instance.get(`profile/` + userId)
	},
	getStatus(userId: number) {
		return instance.get(`profile/status/` + userId)
	},
	updateStatus(status: string) {
		return instance.put(`profile/status`, {status})
	}
}

export const usersAPI = {
	getUsers: (currentPage: number, pageSize: number) => {
		return instance.get(`users?page=${currentPage}&count=${pageSize}`, {
			withCredentials: true
		})
		.then(response => {
			return response.data
		})
	},

	follow(userId: number) {
		return instance.post(`follow/${userId}`)
	},

	unfollow(userId: number) {
		return instance.delete(`follow/${userId}`)
	},

	getProfile(userId: number) {
		console.warn('Obsolete method. Please profilAPI object')
		return profileAPI.getProfile(userId)
	}
}

export const authAPI = {
	me() {
		return instance.get(`auth/me`)
	}
}
