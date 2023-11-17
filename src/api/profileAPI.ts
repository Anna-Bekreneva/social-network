import { instance, ResponseType } from "./";
import { PhotosType, ProfileType } from "../store";

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<ResponseType<ProfileType>>(`profile/` + userId);
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/` + userId);
  },
  updateStatus(status: string) {
    return instance.put<ResponseType<{ status: string }>>(`profile/status`, { status });
  },
  savePhoto(file: string) {
    const formData = new FormData();

    formData.append("image", file);

    return instance.put<ResponseType<{ photos: PhotosType }>>(`profile/photo`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  saveProfile(profile: ProfileType) {
    return instance.put<ResponseType>(`profile`, profile);
  },
};
