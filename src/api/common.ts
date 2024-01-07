import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-kEY": "f7924403-26c6-4ed7-ac40-d679f3c4cd6f",
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
