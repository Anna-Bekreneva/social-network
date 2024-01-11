import { APIResponseType, profileAPI, ResultCode } from "../../api";
import {
  ActionsTypeProfile,
  getStatus,
  getUserProfile,
  profileActions,
  ProfileType,
  savePhoto,
  saveProfile,
  updateStatus,
} from "./profileReducer";
import { PhotosType } from "../users";
import { CombinedState } from "redux";
import { AppStateType, BaseThunkType } from "../store";
import { FormAction } from "redux-form";

jest.mock("../../api");
const profileAPIMock = profileAPI as jest.Mocked<typeof profileAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
});

test("get user profile", async () => {
  const profile = {} as ProfileType;
  profileAPIMock.getProfile.mockReturnValue(Promise.resolve(profile));
  const thunk = getUserProfile(2);
  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(1);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, profileActions.setUserProfile(profile));
});

test("get status", async () => {
  const status = "";
  profileAPIMock.getStatus.mockReturnValue(Promise.resolve(status));
  const thunk = getStatus(2);
  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(1);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, profileActions.setStatus(status));
});

test("update status", async () => {
  const response: APIResponseType<{ status: string }> = {
    resultCode: ResultCode.Success,
    messages: [],
    data: { status: "" },
  };

  profileAPIMock.updateStatus.mockReturnValue(Promise.resolve(response));
  const newStatus = "new Status";
  const thunk = updateStatus(newStatus);
  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(1);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, profileActions.setStatus(newStatus));
});

test("save photos", async () => {
  const response: APIResponseType<{ photos: PhotosType }> = {
    resultCode: ResultCode.Success,
    messages: [],
    data: { photos: { large: "", small: "" } },
  };

  profileAPIMock.savePhoto.mockReturnValue(Promise.resolve(response));
  const thunk = savePhoto({} as File);
  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(1);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, profileActions.savePhotoSuccess(response.data.photos));
});

test("save profile", async () => {
  const response: APIResponseType = {
    resultCode: ResultCode.Success,
    messages: [],
    data: {},
  };

  const profile = {} as ProfileType;

  const dispatchMock2 = jest.fn();
  const getStateMock2 = jest.fn();

  profileAPIMock.saveProfile.mockReturnValue(Promise.resolve(response));
  profileAPIMock.getProfile.mockReturnValue(Promise.resolve(profile));

  const thunkSaveProfile = saveProfile({} as ProfileType);
  const getStateMock: () => CombinedState<AppStateType> = jest.fn(() => ({ auth: { userId: 123 } }) as AppStateType);

  await thunkSaveProfile(dispatchMock, getStateMock, {});
  const thunkGetUserProfile = getUserProfile(123);

  await thunkGetUserProfile(dispatchMock2, getStateMock2, {});

  expect(dispatchMock).toBeCalledTimes(1);

  // todo: how can i check that this thunk dispatch other thunkCreator?
  // expect(dispatchMock).toHaveBeenNthCalledWith(1, getUserProfile(123));

  expect(dispatchMock2).toBeCalledTimes(1);
  expect(dispatchMock2).toHaveBeenNthCalledWith(1, profileActions.setUserProfile(profile));
});
