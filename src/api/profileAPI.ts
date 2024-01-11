import { instance, APIResponseType } from "./";
import { PhotosType, ProfileType } from "../store";

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<ProfileType>(`profile/` + userId).then((res) => res.data);
  },
  getStatus(userId: number) {
    return instance.get<string>(`profile/status/` + userId).then((res) => res.data);
  },
  updateStatus(status: string) {
    return instance.put<APIResponseType<{ status: string }>>(`profile/status`, { status }).then((res) => res.data);
  },
  savePhoto(file: File) {
    const formData = new FormData();

    formData.append("image", file);

    return instance
      .put<APIResponseType<{ photos: PhotosType }>>(`profile/photo`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => res.data);
  },
  saveProfile(profile: ProfileType) {
    return instance.put<APIResponseType>(`profile`, profile).then((res) => res.data);
  },
};
