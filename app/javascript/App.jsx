import React, { Component } from 'react';
import { Switch } from 'react-router';
import { Route, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

import GenrePage from './containers/GenrePage';
import AnimePage from './containers/AnimePage';
import HomePage from './containers/HomePage';
import SiteMenu from './components/SiteMenu';
import NotFoundPage from './containers/NotFoundPage';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import './App.scss';
import * as actions from './store/actions';
import Navbar from './components/Navbar/Navbar';

class App extends Component {

  componentDidMount(){
    this.props.tryAutoSignIn();
  }

  render() {
    return (
      <Layout className="App">
        {/*<SiteMenu*/}
          {/*isAuthenticated={this.props.isAuthenticated}*/}
          {/*userData={this.props.userData}*/}
          {/*logout={this.props.logout}*/}
        {/*/>*/}
        <Navbar/>
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

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  tryAutoSignIn: PropTypes.func.isRequired
};


const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userData: state.auth.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
    tryAutoSignIn: () => dispatch(actions.authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
