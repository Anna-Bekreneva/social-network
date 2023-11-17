import { instance, ResponseType } from "./";
import { UserType } from "../store";

type GetUsersType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};
export const usersAPI = {
  getUsers: async (currentPage: number, pageSize: number) => {
    const response = await instance.get<ResponseType<GetUsersType>>(`users?page=${currentPage}&count=${pageSize}`, {
      withCredentials: true,
    });
    return response.data;
  },

  follow(userId: number) {
    return instance.post<ResponseType>(`follow/${userId}`);
  },

  unfollow(userId: number) {
    return instance.delete<ResponseType>(`follow/${userId}`);
  },
};
