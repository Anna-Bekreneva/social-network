import { instance, profileAPI } from './'

export const usersAPI = {
  getUsers: (currentPage: number, pageSize: number) => {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`, {
        withCredentials: true,
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
  },
}
