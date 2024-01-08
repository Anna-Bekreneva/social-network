import React, { ComponentPropsWithoutRef } from "react";

import { connect } from "react-redux";

import { AppStateType, logout } from "store";
import { Navigation } from "./";

type MapStatePropsType = {
  name: string | undefined;
  ava: string | undefined | null;
};

type MapDispatchToPropsType = {
  logout: () => void;
};

class NavigationInner extends React.Component<NavigationPropsType> {
  render() {
    const { ava, name, logout, ...restProps } = this.props;
    return <Navigation ava={ava} name={name} logout={logout} {...restProps} />;
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  name: state.profile.profile?.fullName,
  ava: state.profile.profile?.photos.small,
});

export type NavigationPropsType = MapStatePropsType & MapDispatchToPropsType & ComponentPropsWithoutRef<"nav">;
export const NavigationContainer = connect(mapStateToProps, { logout })(NavigationInner);
