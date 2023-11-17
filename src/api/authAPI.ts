import { instance, ResponseType, ResultCode, ResultCodeWithCaptcha } from "./";

type MeType = {
  id: number;
  email: string;
  login: string;
};

export const authAPI = {
  me() {
    return instance.get<ResponseType<MeType>>(`auth/me`);
  },
  login(email: string, password: string, rememberMe: boolean = false, captcha: null | string) {
    return instance.post<
      ResponseType<{ userId: number }, (typeof ResultCodeWithCaptcha)[keyof typeof ResultCodeWithCaptcha]>
    >("auth/login", {
      email,
      password,
      rememberMe,
      captcha,
    });
  },
  logout() {
    return instance.delete<ResponseType>("auth/login");
  },
};
