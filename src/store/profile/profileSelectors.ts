import { AppStateType } from "../store";
import { ProfileType } from "../../components";
import { PostType } from "./profileReducer";

export const selectProfile = (state: AppStateType): ProfileType | null => state.profile.profile;
export const selectStatusProfile = (state: AppStateType): string => state.profile.status;
export const selectPosts = (state: AppStateType): PostType[] => state.profile.posts;
export const selectAva = (state: AppStateType): string | null => state.auth.ava;
