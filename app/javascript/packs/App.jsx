import React, { Component } from "react";
import { Switch } from "react-router";
import { Route, withRouter } from "react-router-dom";
import { Layout } from "antd";

import GenrePage from "./containers/GenrePage";
import AnimePage from "./containers/AnimePage";
import HomePage from "./containers/HomePage";

import "./App.scss";
import SiteMenu from "./containers/SiteMenu";

const { Header, Content, Footer } = Layout;

class App extends Component {
  render() {
    return (
      <Layout className="App">
        <SiteMenu />
        <Switch>
          <Route exact path="/" render={() => <HomePage />} />
          <Route exact path="/anime" render={() => <AnimePage />} />
          <Route exact path="/genre" render={() => <GenrePage />} />
          <Route render={() => <NotFoundPage />} />
        </Switch>
      </Layout>
    );
  }
}

export default App;
