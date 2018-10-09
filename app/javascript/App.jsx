import React, { Component } from "react";
import { Switch } from "react-router";
import { Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Layout } from "antd";
import throttle from "lodash/throttle";

import GenrePage from "./containers/GenrePage";
import AnimePage from "./containers/AnimePage";
import HomePage from "./containers/HomePage";
import NotFoundPage from "./containers/NotFoundPage";
import LoginPage from "./containers/LoginPage";
import RegisterPage from "./containers/RegisterPage";
import "./App.scss";
import * as actions from "./store/actions";
import Navbar from "./components/Navbar/Navbar";

class App extends Component {
  state = {
    scrollY: 0,
    showElement: true
  };

  componentWillMount() {
    this.props.getTopAnime(1, 5);
    this.props.getGenreList();
    this.props.getGenreTop(1);
  }
  
  componentDidMount() {
    this.props.tryAutoSignIn();

    window.addEventListener("scroll", throttle(this.handleScroll, 250), false);
  }

  componentWillUnmount() {
    window.removeEventListener(
      "scroll",
      throttle(this.handleScroll, 250),
      false
    );
  }

  handleScroll = () => {
    const scrollY = window.pageYOffset;
    if (scrollY < 40) {
      return;
    }
    this.setState(prevState => ({
      scrollY,
      showElement: prevState.scrollY > scrollY
    }));
  };

  render() {
    return (
      <Layout className="App">
        <Navbar
          isAuthenticated={this.props.isAuthenticated}
          userData={this.props.userData}
          logout={this.props.logout}
          show={this.state.showElement}
        />
        <div className="main-page">
          <Switch>
            <Route
              exact
              path="/"
              to={HomePage}
              render={() => (
                <HomePage
                  topAnimeData={this.props.topAnimeData}
                  genresListData={this.props.genresListData}
                  genreTopData={this.props.genreTopData}
                />
              )}
            />
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
  tryAutoSignIn: PropTypes.func.isRequired,
  getTopAnime: PropTypes.func.isRequired,
  getGenresList: PropTypes.func.isRequired,
  getGenreTop: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userData: state.auth.userData,
    topAnimeData: state.anime.topAnimeData,
    genresListData: state.anime.genresListData,
    genreTopData: state.anime.genreTopData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
    tryAutoSignIn: () => dispatch(actions.authCheckState()),
    getTopAnime: (page, itemPerPage) =>
      dispatch(actions.getTopAnime(page, itemPerPage)),
    getGenreList: (page, itemPerPage) =>
      dispatch(actions.getGenresList(page, itemPerPage)),
    getGenreTop: id => dispatch(actions.getGenreTop(id))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
