import { instance, ResponseType } from "./";

type MeType = {
  id: number;
  email: string;
  login: string;
};
export const authAPI = {
  me() {
    // с каптчей поработать
    return instance.get<ResponseType<MeType>>(`auth/me`);
  },
  login(email: string, password: string, rememberMe: boolean = false, captcha: null | string) {
    return instance.post<ResponseType<{ userId: number }>>("auth/login", {
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
