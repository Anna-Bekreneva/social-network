import { stopSubmit } from "redux-form";

import { BaseThunkType, InferActionsTypes } from "./store";

import { profileAPI, ResultCode } from "api";

const initialState: ProfilePageType = {
  posts: [
    { id: 1, message: "Hi, how are you?", likesCount: 12 },
    { id: 2, message: "It's, my first post?", likesCount: 11 },
    { id: 3, message: "Blabla", likesCount: 11 },
    { id: 4, message: "Dadada", likesCount: 11 },
  ],
  profile: {
    aboutMe: "",
    userId: 0,
    lookingForAJobDescription: "",
    fullName: "",
    contacts: {
      youtube: "",
      website: "",
      vk: "",
      twitter: "",
      mainLink: "",
      instagram: "",
      github: "",
      facebook: "",
    },
    lookingForAJob: false,
    photos: {
      small: "",
      large: "",
    },
    status: "string",
  },
};

export const profile = (state: ProfilePageType = initialState, action: ActionsTypeProfile): ProfilePageType => {
  switch (action.type) {
    case "profile/ADD-POST":
      return {
        ...state,
        posts: [...state.posts, { id: 5, message: action.newPostText, likesCount: 0 }],
      };

    case "profile/SET-USER-PROFILE":
      return { ...state, profile: { ...action.profile } };
    case "profile/SET-STATUS":
      return { ...state, profile: { ...state.profile, status: action.status } };
    case "profile/DELETE-POST": {
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.id),
      };
    }
    case "profile/SAVE-PHOTO-SUCCESS":
      return { ...state, profile: { ...state.profile, photos: action.photos } };

    default:
      return state;
  }
};

export const profileActions = {
  addPost: (newPostText: string) => ({ type: "profile/ADD-POST", newPostText }) as const,

  setUserProfile: (profile: ProfileType) => ({ type: "profile/SET-USER-PROFILE", profile }) as const,

  setStatus: (status: string) => ({ type: "profile/SET-STATUS", status }) as const,

  deletePost: (id: number) => ({ type: "profile/DELETE-POST", id }) as const,

  savePhotoSuccess: (photos: { small: string; large: string }) =>
    ({ type: "profile/SAVE-PHOTO-SUCCESS", photos }) as const,
};

type ActionsTypeProfile = InferActionsTypes<typeof profileActions>;

export const getUserProfile =
  (userId: number): BaseThunkType<ActionsTypeProfile> =>
  async (dispatch) => {
    const response = await profileAPI.getProfile(userId);

    dispatch(profileActions.setUserProfile(response.data.data));
  };

export const getStatus =
  (userId: number): BaseThunkType<ActionsTypeProfile> =>
  async (dispatch) => {
    profileAPI.getStatus(userId).then((response) => {
      dispatch(profileActions.setStatus(response.data));
    });
  };

export const updateStatus =
  (status: string): BaseThunkType<ActionsTypeProfile> =>
  async (dispatch) => {
    const response = await profileAPI.updateStatus(status);

    if (response.data.resultCode === ResultCode.Success) {
      dispatch(profileActions.setStatus(status));
    }
  };

export const savePhoto =
  (file: string): BaseThunkType<ActionsTypeProfile> =>
  async (dispatch) => {
    const response = await profileAPI.savePhoto(file);

    if (response.data.resultCode === ResultCode.Success) {
      dispatch(profileActions.savePhotoSuccess(response.data.data.photos));
    }
  };

export const saveProfile =
  (profile: ProfileType): BaseThunkType<ActionsTypeProfile | ReturnType<typeof stopSubmit>> =>
  async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === ResultCode.Success) {
      if (userId !== null) {
        dispatch(getUserProfile(userId));
      } else {
        throw new Error("userId can't be null");
      }
    } else {
      dispatch(stopSubmit("edit-profile", { _error: response.data.messages[0] }));

      return Promise.reject(response.data.messages[0]);
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

export type PhotosType = {
  small: string;
  large: string;
};

type PostType = {
  id: number;
  message: string;
  likesCount: number;
};

export type ProfilePageType = {
  posts: Array<PostType>;
  profile: ProfileType;
};

export type ProfileType = {
  aboutMe: string;
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: PhotosType;
  status: string;
};
