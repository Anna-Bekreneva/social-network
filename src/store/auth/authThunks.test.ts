import {
  APIResponseType,
  authAPI,
  MeType,
  profileAPI,
  ResultCode,
  ResultCodeWithCaptcha,
  securityAPI,
} from "../../api";
import { authActions, getAuthUserData, getAva, getCaptchaUrl, login, logout } from "./authReducer";
import { stopSubmit } from "redux-form";
import { ProfileType } from "../profile";
import { CombinedState } from "redux";
import { AppStateType } from "../store";

jest.mock("../../api/");

const authAPIMock = authAPI as jest.Mocked<typeof authAPI>;
const securityAPIMock = securityAPI as jest.Mocked<typeof securityAPI>;
const profileAPIMock = profileAPI as jest.Mocked<typeof profileAPI>;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
});

test("get user data", async () => {
  const response: APIResponseType<MeType> = {
    resultCode: ResultCode.Success,
    messages: [],
    data: {
      id: 123,
      email: "email",
      login: "login",
    },
  };

  authAPIMock.me.mockReturnValue(Promise.resolve(response));
  const thunk = getAuthUserData();
  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(1);
  expect(dispatchMock).toHaveBeenNthCalledWith(
    1,
    authActions.setAuthUserData(response.data.id, response.data.login, response.data.email, true),
  );
});

test("login without captcha", async () => {
  const response: APIResponseType<
    { userId: number },
    (typeof ResultCodeWithCaptcha)[keyof typeof ResultCodeWithCaptcha]
  > = {
    resultCode: ResultCode.Success,
    messages: [],
    data: {
      userId: 123,
    },
  };

  authAPIMock.login.mockReturnValue(Promise.resolve(response));

  const thunk = login("email", "password", false, null);
  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(1);

  // todo: how can i correct it?
  // expect(dispatchMock).toHaveBeenNthCalledWith(1, getAuthUserData());
});

test("login with captcha", async () => {
  const response: APIResponseType<
    { userId: number },
    (typeof ResultCodeWithCaptcha)[keyof typeof ResultCodeWithCaptcha]
  > = {
    resultCode: ResultCodeWithCaptcha.CaptchaIsRequired,
    messages: [],
    data: {
      userId: 123,
    },
  };

  authAPIMock.login.mockReturnValue(Promise.resolve(response));

  const thunk = login("email", "password", false, "null");
  await thunk(dispatchMock, getStateMock, {});

  const message = response.messages.length > 0 ? response.messages[0] : "Some error";

  expect(dispatchMock).toBeCalledTimes(2);
  // expect(dispatchMock).toHaveBeenNthCalledWith(1, getCaptchaUrl());
  expect(dispatchMock).toHaveBeenNthCalledWith(2, stopSubmit("login", { _error: message }));
});

test("get captcha url", async () => {
  const captchaUrl = "captchaUrl";
  securityAPIMock.getCaptchaUrl.mockReturnValue(Promise.resolve({ url: captchaUrl }));

  const thunk = getCaptchaUrl();
  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(1);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, authActions.getCaptchaUrlSuccess(captchaUrl));
});

test("logout success", async () => {
  const response: APIResponseType = {
    resultCode: ResultCode.Success,
    messages: [],
    data: {},
  };

  authAPIMock.logout.mockReturnValue(Promise.resolve(response));
  const thunk = logout();
  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(0);
});

test("logout error", async () => {
  const response: APIResponseType = {
    resultCode: ResultCode.Error,
    messages: [],
    data: {},
  };

  authAPIMock.logout.mockReturnValue(Promise.resolve(response));
  const thunk = logout();
  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(1);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, authActions.setAuthUserData(null, null, null, false));
});

test("set ava", async () => {
  const profile = {
    photos: {
      large: "large",
      small: "small",
    },
  } as ProfileType;
  profileAPIMock.getProfile.mockReturnValue(Promise.resolve(profile));

  const getStateMock: () => CombinedState<AppStateType> = jest.fn(() => ({ auth: { userId: 123 } }) as AppStateType);

  const thunk = getAva();
  await thunk(dispatchMock, getStateMock, {});

  expect(dispatchMock).toBeCalledTimes(1);
  expect(dispatchMock).toHaveBeenNthCalledWith(1, authActions.setAva(profile.photos.small));
  expect(getStateMock).toBeCalledTimes(1);
});
