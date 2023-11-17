import React from "react";

import { connect } from "react-redux";
import { compose, Dispatch } from "redux";

import { Dialogs } from "./Dialogs";

import { withAuthRedirect } from "hoc";
import { AppStateType, dialogsActions, DialogsStateType } from "store";

type MapStatePropsType = {
  dialogsPage: DialogsStateType;
  isAuth: boolean;
};

type MapDispatchToPropsType = {
  sendMessage: (newMessageBody: string) => void;
};

export type DialogsPropsType = MapStatePropsType & MapDispatchToPropsType;

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  dialogsPage: state.dialogs,
  isAuth: state.auth.isAuth,
});

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
  return {
    sendMessage: (newMessageBody: string) => dispatch(dialogsActions.sendMessage(newMessageBody)),
  };
};

export default compose<React.ComponentType>(connect(mapStateToProps, mapDispatchToProps), withAuthRedirect)(Dialogs);
