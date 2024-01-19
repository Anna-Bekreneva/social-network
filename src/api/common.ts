import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-kEY": "758506e2-acfc-4428-b496-ba8aaa722b57",
  },
});

export type APIResponseType<T = {}, R = (typeof ResultCode)[keyof typeof ResultCode]> = {
  data: T;
  resultCode: R;
  messages: string[];
};

export const ResultCode = {
  Success: 0,
  Error: 1,
} as const;

export const ResultCodeWithCaptcha = {
  ...ResultCode,
  CaptchaIsRequired: 10,
} as const;
