import { PhotosType, profile, profileActions, ProfileInitialStateType, ProfileType } from "store/index";

let state: ProfileInitialStateType;

beforeEach(() => {
  state = {
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
    },
    status: "string",
  };
});

test("add new post", () => {
  const newPostText = "new post";
  const action = profileActions.addPost(newPostText);
  const newState = profile(state, action);

  expect(newState.posts.length).toBe(5);
  expect(newState.posts[4].message).toBe(newPostText);
});

test("remove post", () => {
  const action = profileActions.deletePost(1);
  const newState = profile(state, action);

  expect(newState.posts.length).toBe(3);
});

test("set user profile", () => {
  state = { ...state, profile: null };
  expect(state.profile).toBeNull();

  const newProfile: ProfileType = {
    aboutMe: "My name Anna",
    userId: 5,
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
  };

  const newState = profile(state, profileActions.setUserProfile(newProfile));

  expect(newState.profile).not.toBeNull();
  expect(newState.profile).toEqual(newProfile);
});

test("set status", () => {
  const newStatus = "I have a job";
  const newState = profile(state, profileActions.setStatus(newStatus));

  expect(newState.status).toBe(newStatus);
});

test("save photos", () => {
  const newPhotos: PhotosType = {
    small: "picture/travelling/myPhoto/i.jpg",
    large: "picture/travelling/nature.jpg",
  };

  const newState = profile(state, profileActions.savePhotoSuccess(newPhotos));

  expect(newState.profile).not.toBeUndefined();
  expect(newState.profile?.photos).not.toBeUndefined();
  expect(newState.profile?.photos).toEqual(newPhotos);
});

test("save only small photo", () => {
  const newPhotos: PhotosType = {
    small: "picture/travelling/myPhoto/i.jpg",
    large: state.profile?.photos.large ?? null,
  };

  const newState = profile(state, profileActions.savePhotoSuccess(newPhotos));

  expect(newState.profile?.photos.small).toBe(newPhotos.small);
  expect(newState.profile?.photos.large).toBe(state.profile?.photos.large);
});

test("save only large photo", () => {
  const newPhotos: PhotosType = {
    small: state.profile?.photos.small ?? null,
    large: "picture/travelling/nature.jpg",
  };

  const newState = profile(state, profileActions.savePhotoSuccess(newPhotos));

  expect(newState.profile?.photos.large).toBe(newPhotos.large);
  expect(newState.profile?.photos.small).toBe(state.profile?.photos.small);
});
