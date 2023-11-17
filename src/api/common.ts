import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-kEY": "f7924403-26c6-4ed7-ac40-d679f3c4cd6f",
  },
});

export type ResponseType<T = {}, R = (typeof ResultCode)[keyof typeof ResultCode]> = {
  resultCode: R;
  messages: string[];
  data: T;
};

export const ResultCode = {
  Success: 0,
  Error: 1,
} as const;

export const ResultCodeWithCaptcha = {
  ...ResultCode,
  CaptchaIsRequired: 10,
} as const;
