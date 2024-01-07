import { instance, APIResponseType } from "./";
import { PhotosType, ProfileType } from "../store";

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<ProfileType>(`profile/` + userId);
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/` + userId);
  },
  updateStatus(status: string) {
    return instance.put<APIResponseType<{ status: string }>>(`profile/status`, { status });
  },
  savePhoto(file: File) {
    const formData = new FormData();

    formData.append("image", file);

    return instance.put<APIResponseType<{ photos: PhotosType }>>(`profile/photo`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  saveProfile(profile: ProfileType) {
    return instance.put<APIResponseType>(`profile`, profile);
  },
};
