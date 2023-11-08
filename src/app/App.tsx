import React from "react";

import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { compose } from "redux";

import { Login, Preloader } from "components";
import { WithSuspense } from "hoc";
import { AppStateType, initializeApp } from "store";
import { Flex } from "antd";
import s from "./App.module.scss";
import { NavigationContainer } from "../components/Navigation";

const DialogsContainer = React.lazy(() => import("../components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("../components/Profile/ProfileContainer"));
const UsersContainer = React.lazy(() => import("../components/Users/UsersContainer"));

class App extends React.Component<AppProps> {
  catchAllUnhandledErrors = (promiseRejectionEvent: any) => {
    alert("Some error occurred");
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) return <Preloader />;
    return (
      <Flex className={s.container} gap={"middle"} align="start">
        <NavigationContainer className={s.navigation} />
        <main className={s.main}>
          <Switch>
            <Route path="/" render={() => <Redirect to={"/profile"} />} exact />
            <Route path="/dialogs" render={WithSuspense(DialogsContainer)} />
            <Route path="/profile/:userId?" render={WithSuspense(ProfileContainer)} />
            <Route path="/users" render={WithSuspense(UsersContainer)} />
            <Route path="/login" render={() => <Login />} />
            <Route path="*" render={() => <div> 404 NOT FOUND </div>} />
          </Switch>
        </main>
      </Flex>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: state.app.initialized,
});

type mapStateToPropsType = {
  initialized: boolean;
};

type mapDispatchToPropsType = {
  initializeApp: () => void;
};

type AppProps = mapStateToPropsType & mapDispatchToPropsType;

export default compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initializeApp }))(App);
