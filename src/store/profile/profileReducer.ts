import { FormAction, stopSubmit } from "redux-form";

import { BaseThunkType, InferActionsTypes } from "../store";

import { profileAPI, ResultCode } from "api";
import { PhotosType } from "../users";
import { getAva } from "../auth";

const initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "It's, my first post?", likesCount: 11 },
    { id: 3, message: "Blabla", likesCount: 11 },
    { id: 4, message: "Dadada", likesCount: 11 },
  ],
  profile: null as ProfileType | null,
  status: "",
};

export const profile = (state = initialState, action: ActionsTypeProfile): ProfileInitialStateType => {
  switch (action.type) {
    case "profile/ADD-POST":
      return {
        ...state,
        posts: [...state.posts, { id: 5, message: action.newPostText, likesCount: 0 }],
      };
    case "profile/SET-USER-PROFILE":
      return { ...state, profile: { ...action.profile } };
    case "profile/SET-STATUS":
      return { ...state, status: action.status };
    case "profile/DELETE-POST": {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.id),
      };
    }
    case "profile/SAVE-PHOTO-SUCCESS":
      return { ...state, profile: { ...state.profile, photos: action.photos } as ProfileType };

    default:
      return state;
  }
};

export const profileActions = {
  addPost: (newPostText: string) => ({ type: "profile/ADD-POST" as const, newPostText }),

  setUserProfile: (profile: ProfileType) => ({ type: "profile/SET-USER-PROFILE" as const, profile }),

  setStatus: (status: string) => ({ type: "profile/SET-STATUS" as const, status }),

  deletePost: (id: number) => ({ type: "profile/DELETE-POST" as const, id }),

  savePhotoSuccess: (photos: PhotosType) => ({ type: "profile/SAVE-PHOTO-SUCCESS" as const, photos }),
};

export type ActionsTypeProfile = InferActionsTypes<typeof profileActions>;

export const getUserProfile =
  (userId: number): BaseThunkType<ActionsTypeProfile | FormAction> =>
  async (dispatch) => {
    const profile = await profileAPI.getProfile(userId);
    dispatch(profileActions.setUserProfile(profile));
  };

export const getStatus =
  (userId: number): BaseThunkType<ActionsTypeProfile> =>
  async (dispatch) => {
    profileAPI.getStatus(userId).then((status) => {
      dispatch(profileActions.setStatus(status));
    });
  };

export const updateStatus =
  (status: string): BaseThunkType<ActionsTypeProfile> =>
  async (dispatch) => {
    const response = await profileAPI.updateStatus(status);

    if (response.resultCode === ResultCode.Success) {
      dispatch(profileActions.setStatus(status));
    }
  };

export const savePhoto =
  (file: File): BaseThunkType<ActionsTypeProfile> =>
  async (dispatch) => {
    const response = await profileAPI.savePhoto(file);

    if (response.resultCode === ResultCode.Success) {
      dispatch(profileActions.savePhotoSuccess(response.data.photos));
      dispatch(getAva())
    }
  };

export const saveProfile =
  (profile: ProfileType): BaseThunkType<ActionsTypeProfile | ReturnType<typeof stopSubmit>> =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);
    if (response.resultCode === ResultCode.Success) {
      if (userId !== null) {
        await dispatch(getUserProfile(userId));
      } else {
        throw new Error("userId can't be null");
      }
    } else {
      dispatch(stopSubmit("edit-profile", { _error: response.messages[0] }));

      return Promise.reject(response.messages[0]);
    }
  };

export type ContactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};

export type PostType = {
  id: number;
  message: string;
  likesCount: number;
};

export type ProfileType = {
  aboutMe: string;
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
};

export type ProfileInitialStateType = typeof initialState;
