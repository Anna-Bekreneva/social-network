import React from "react";

import { connect } from "react-redux";
import { compose } from "redux";

import { Dialogs } from "./Dialogs";

import { withAuthRedirect } from "hoc";
import { AppStateType } from "store";
import { dialogsActions, DialogsStateType, selectDialogs } from "../../store";

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  dialogsPage: selectDialogs(state),
});

type MapStatePropsType = {
  dialogsPage: DialogsStateType;
};

type MapDispatchToPropsType = {
  sendMessage: (newMessageBody: string) => void;
};

export type DialogsPropsType = MapStatePropsType & MapDispatchToPropsType;

export default compose<React.ComponentType>(connect(mapStateToProps, { ...dialogsActions }), withAuthRedirect)(Dialogs);
