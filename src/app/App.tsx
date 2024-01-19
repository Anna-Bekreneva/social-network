import React from "react";

import { connect } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import { compose } from "redux";

import { Login, NavigationContainer, Preloader } from "components";
import { WithSuspense } from "hoc";
import { AppStateType, appReducer, selectApp, selectIsAuth } from "store";
import { Col, Row } from "antd";
import s from "./App.module.scss";

const DialogsContainer = React.lazy(() => import("../components/Dialogs/DialogsContainer"));
const ProfileContainer = React.lazy(() => import("../components/Profile/ProfileContainer"));
const UsersContainer = React.lazy(() => import("../components/Users/UsersContainer"));

class App extends React.Component<AppProps> {
  catchAllUnhandledErrors = (e: PromiseRejectionEvent) => alert("Some error occurred");

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <Row className={s.container}>
        {this.props.isAuth && (
          <Col span={4}>
            <NavigationContainer className={s.navigation} />
          </Col>
        )}
        <Col span={12}>
          <main>
            <Switch>
              <Route path="/" render={() => <Redirect to={"/profile"} />} exact />
              <Route path="/dialogs" render={WithSuspense(DialogsContainer)} />
              <Route path="/profile/:userId?" render={WithSuspense(ProfileContainer)} />
              <Route path="/users" render={WithSuspense(UsersContainer)} />
              <Route path="/login" render={() => <Login />} />
              <Route path="*" render={() => <div> 404 NOT FOUND </div>} />
            </Switch>
          </main>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = (state: AppStateType) => ({
  initialized: selectApp(state),
  isAuth: selectIsAuth(state),
});

type mapStateToPropsType = {
  initialized: boolean;
  isAuth: boolean;
};

type mapDispatchToPropsType = {
  initializeApp: () => void;
};

type AppProps = mapStateToPropsType & mapDispatchToPropsType;

export default compose<React.ComponentType>(withRouter, connect(mapStateToProps, { initializeApp: appReducer }))(App);
