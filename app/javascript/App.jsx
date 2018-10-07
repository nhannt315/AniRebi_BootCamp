import React, { Component } from 'react';
import { Switch } from 'react-router';
import { Route } from 'react-router-dom';
import { Layout } from 'antd';

import GenrePage from './containers/GenrePage';
import AnimePage from './containers/AnimePage';
import HomePage from './containers/HomePage';
import SiteMenu from './components/SiteMenu';

import './App.scss';
import NotFoundPage from './containers/NotFoundPage';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';


class App extends Component {
  render() {
    return (
      <Layout className="App">
        <SiteMenu />
        <div className="main-page">
          <Switch>
            <Route exact path="/" to={HomePage} render={() => <HomePage />} />
            <Route exact path="/anime" render={() => <AnimePage />} />
            <Route exact path="/genre" render={() => <GenrePage />} />
            <Route exact path="/login" render={() => <LoginPage />} />
            <Route exact path="/register" render={() => <RegisterPage />} />
            <Route render={() => <NotFoundPage />} />
          </Switch>
        </div>

      </Layout>
    );
  }
}

export default App;
