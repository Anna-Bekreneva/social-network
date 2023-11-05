import axios from "axios";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-kEY": "f7924403-26c6-4ed7-ac40-d679f3c4cd6f",
  },
});
