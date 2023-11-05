import { instance } from "./";

export const profileAPI = {
  getProfile(userId: number) {
    return instance.get(`profile/` + userId);
  },
  getStatus(userId: number) {
    return instance.get(`profile/status/` + userId);
  },
  updateStatus(status: string) {
    return instance.put(`profile/status`, { status });
  },
  savePhoto(file: string) {
    const formData = new FormData();

    formData.append("image", file);

    return instance.put(`profile/photo`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  saveProfile(profile: any) {
    return instance.put(`profile`, profile);
  },
};
