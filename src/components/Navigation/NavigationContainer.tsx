import React, { ComponentPropsWithoutRef } from "react";

import { connect } from "react-redux";

import { AppStateType, selectAva, logout, getAva, getAuthUserData, selectIsAuth, selectLogin } from "store";
import { Navigation } from "./";

type MapStatePropsType = {
  name: string | null;
  ava: string | undefined | null;
};

type MapDispatchToPropsType = {
  logout: () => Promise<unknown>;
  getAva: () => void;
};

class NavigationInner extends React.Component<NavigationPropsType> {
  componentDidMount() {
    this.props.getAva();
  }

  render() {
    const { name, logout, ava, getAva, ...rest } = this.props;
    return <Navigation name={name} logout={logout} ava={ava} {...rest} />;
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  name: selectLogin(state),
  ava: selectAva(state),
});

export type NavigationPropsType = MapStatePropsType & MapDispatchToPropsType & ComponentPropsWithoutRef<"nav">;
export const NavigationContainer = connect(mapStateToProps, { logout, getAva })(NavigationInner);
