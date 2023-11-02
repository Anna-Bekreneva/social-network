import { instance } from './'

export const authAPI = {
  me() {
    return instance.get(`auth/me`)
  },
  login(email: string, password: string, rememberMe: boolean = false, captcha: null | string) {
    return instance.post('auth/login', {
      email,
      password,
      rememberMe,
      captcha,
    })
  },
  logout() {
    return instance.delete('auth/login')
  },
}
