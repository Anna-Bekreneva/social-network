import { instance, APIResponseType } from "./";
import { UserType } from "../store";

type GetUsersType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};

export const usersAPI = {
  getUsers: async (currentPage: number, pageSize: number, term = "", friend: null | boolean = null) => {
    return instance
      .get<GetUsersType>(
        `users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend === null ? "" : `friend=${friend}`),
      )
      .then((res) => res.data);
  },

  follow(userId: number) {
    return instance.post<APIResponseType>(`follow/${userId}`).then((res) => res.data);
  },

  unfollow(userId: number) {
    return instance.delete<APIResponseType>(`follow/${userId}`).then((res) => res.data) as Promise<APIResponseType>;
  },
};
