import React from "react";

import { connect } from "react-redux";
import { compose, Dispatch } from "redux";

import { Dialogs } from "./Dialogs";

import { withAuthRedirect } from "hoc";
import { AppStateType, dialogsActions, DialogsStateType } from "store";

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  dialogsPage: state.dialogs,
});

type MapStatePropsType = {
  dialogsPage: DialogsStateType;
};

type MapDispatchToPropsType = {
  sendMessage: (newMessageBody: string) => void;
};

export type DialogsPropsType = MapStatePropsType & MapDispatchToPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, { ...dialogsActions }), withAuthRedirect)(Dialogs);
