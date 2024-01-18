import { auth, authActions, AuthInitialStateType } from "./authReducer";

let state: AuthInitialStateType;

beforeEach(() => {
  state = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null,
    ava: null,
  };
});

test("set user data", () => {
  const data = {
    userId: 123,
    email: "myEmail",
    login: "myLogin",
    isAuth: true,
  };

  const newState = auth(state, authActions.setAuthUserData(data.userId, data.email, data.login, data.isAuth));

  expect(newState.userId).toBe(data.userId);
  expect(newState.email).toBe(data.email);
  expect(newState.login).toBe(data.login);
  expect(newState.isAuth).toBe(data.isAuth);
});

test("get captcha url", () => {
  const captchaUrl = "captchaUrl";
  const newState = auth(state, authActions.getCaptchaUrlSuccess(captchaUrl));

  expect(newState.captchaUrl).toBe(captchaUrl);
});

test("set ava", () => {
  const ava = "my-new-ava";
  const newState = auth(state, authActions.setAva(ava));

  expect(newState.ava).not.toBeNull();
  expect(newState.ava).toBe(ava);
});
