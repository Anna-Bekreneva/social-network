import { instance, APIResponseType, ResultCode, ResultCodeWithCaptcha } from "./";

export type MeType = {
  id: number;
  email: string;
  login: string;
};

export const authAPI = {
  me() {
    return instance.get<APIResponseType<MeType>>(`auth/me`).then((res) => res.data);
  },
  login(email: string, password: string, rememberMe: boolean = false, captcha: null | string = null) {
    console.log(captcha)
    return instance
      .post<APIResponseType<{ userId: number }, (typeof ResultCodeWithCaptcha)[keyof typeof ResultCodeWithCaptcha]>>(
        "auth/login",
        {
          email,
          password,
          rememberMe,
          captcha,
        },
      )
      .then((res) => res.data);
  },
  logout() {
    return instance.delete<APIResponseType>("auth/login").then((res) => res.data);
  },
};
