import { instance, APIResponseType, ResultCode, ResultCodeWithCaptcha } from "./";

type MeType = {
  id: number;
  email: string;
  login: string;
};

export const authAPI = {
  me() {
    return instance.get<APIResponseType<MeType>>(`auth/me`);
  },
  login(email: string, password: string, rememberMe: boolean = false, captcha: null | string) {
    return instance.post<
      APIResponseType<{ userId: number }, (typeof ResultCodeWithCaptcha)[keyof typeof ResultCodeWithCaptcha]>
    >("auth/login", {
      email,
      password,
      rememberMe,
      captcha,
    });
  },
  logout() {
    return instance.delete<APIResponseType>("auth/login");
  },
};
