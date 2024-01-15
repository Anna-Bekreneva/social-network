import { AppStateType } from "../store";

export const selectIsAuth = (state: AppStateType): boolean => state.auth.isAuth;
export const selectCaptchaUrl = (state: AppStateType): string | null => state.auth.captchaUrl;
export const selectUserId = (state: AppStateType): number | null => state.auth.userId;
