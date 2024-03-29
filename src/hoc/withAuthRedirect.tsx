import React, { ComponentType } from "react";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { AppStateType, selectIsAuth } from "store";

type MapStatePropsType = {
  isAuth: boolean;
};

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  isAuth: selectIsAuth(state),
});
export function withAuthRedirect<T>(Component: ComponentType<T>) {
  function RedirectComponent(props: MapStatePropsType) {
    const { isAuth, ...restProps } = props;

    if (!isAuth) return <Redirect to={"/login"}></Redirect>;

    return <Component {...(restProps as T)} />;
  }

  return connect(mapStateToProps)(RedirectComponent);
}
