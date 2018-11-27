import { Alert, Icon, Layout, Spin } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Switch } from 'react-router';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './App.scss';
import Navbar from './components/Navbar/';
import AnimePage from './containers/AnimePage';
import GenrePage from './containers/GenrePage';
import HomePage from './containers/HomePage';
import NotFoundPage from './containers/NotFoundPage';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import ForgotPasswordPage from './containers/ForgotPasswordPage';
import CheckTokenPage from './containers/ResetPasswordPage';
import './App.scss';
import * as actions from './store/actions';
import AnimeDetailPage from './containers/AnimeDetailPage';
import SearchPage from './containers/SearchPage';
import UserProfilePage from './containers/UserProfilePage';
import GenreDetailPage from './containers/GenreDetailPage';

class App extends Component {
  state = {
    scrollY: 0,
    showElement: true
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTopAnime(1, 14);
    this.props.getRecentlyReviewedAnime(1, 14);
    this.props.getRecentReviews();
    this.props.getGenresList();
    this.props.getMultipleGenreTop([1, 2, 3, 4, 5], 5);
    this.props.tryAutoSignIn();
  }

  render() {
    if (
      !this.props.topAnimeIsProcessing &&
      !this.props.genresListIsProcessing &&
      !this.props.multipleGenreTopIsProcessing &&
      !this.props.recentlyReviewedAnimeIsProcessing &&
      !this.props.recentReviewsIsProcessing
    ) {
      return (
        <Layout className="App">
          <Navbar
            clearSearchResult={this.props.clearSearchResult}
            searchAnime={this.props.searchAnime}
            searchResult={this.props.searchResult}
            keyword={this.props.keywordSearch}
            isAuthenticated={this.props.isAuthenticated}
            userData={this.props.userData}
            logout={this.props.logout}
            show={this.state.showElement}
            history={this.props.history}
            location={this.props.location}
            genreList={this.props.genresListData}
            searchConditions={this.props.searchConditions}
          />
          <div className="main-page">
            <Switch>
              <Route exact path="/" to={HomePage} render={() => <HomePage />} />
              <Route exact path="/anime" render={() => <AnimePage />} />
              <Route path="/anime/" render={() => <AnimeDetailPage />} />
              <Route exact path="/genre" render={() => <GenrePage />} />
              <Route exact path="/login" render={() => <LoginPage />} />
              <Route exact path="/register" render={() => <RegisterPage />} />
              <Route
                exact
                path="/forgot_pwd"
                render={() => <ForgotPasswordPage />}
              />
              <Route
                exact
                path="/reset_pwd"
                render={() => <CheckTokenPage />}
              />
              <Route
                exact
                path="/profile/:id?"
                render={() => (
                  <UserProfilePage
                    userData={this.props.userData}
                    isAuthenticated={this.props.isAuthenticated}
                    history={this.props.history}
                  />
                )}
              />
              <Route
                exact
                path="/forgot_pwd"
                render={() => <ForgotPasswordPage />}
              />
              <Route
                exact
                path="/reset_pwd"
                render={() => <CheckTokenPage />}
              />
              <Route
                exact
                path="/genre/:id"
                render={() => <GenreDetailPage />}
              />
              <Route exact path-="/search" render={() => <SearchPage />} />
              <Route render={() => <NotFoundPage />} />
            </Switch>
          </div>
        </Layout>
      );
    } else {
      return (
        <div style={{ height: '100vh' }}>
          <Alert
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)'
            }}
            message="Please wait"
            description="Page is loading..."
            type="info"
            showIcon
            icon={
              <Spin
                size="large"
                indicator={
                  <Icon type="loading" style={{ fontSize: 24 }} spin />
                }
              />
            }
          />
        </div>
      );
    }
  }
}

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  tryAutoSignIn: PropTypes.func.isRequired,
  getTopAnime: PropTypes.func.isRequired,
  getGenresList: PropTypes.func.isRequired,
  getGenreTop: PropTypes.func.isRequired,
  getMultipleGenreTop: PropTypes.func.isRequired,
  getRecentlyReviewedAnime: PropTypes.func.isRequired,
  getRecentReviews: PropTypes.func.isRequired,
  recentlyReviewedAnimeIsProcessing: PropTypes.bool.isRequired,
  recentReviewsIsProcessing: PropTypes.bool.isRequired,
  topAnimeIsProcessing: PropTypes.bool.isRequired,
  genresListIsProcessing: PropTypes.bool.isRequired,
  genreTopIsProcessing: PropTypes.bool.isRequired,
  multipleGenreTopIsProcessing: PropTypes.bool.isRequired,
  animeByIdIsProcessing: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  searchResult: PropTypes.array,
  clearSearchResult: PropTypes.func,
  searchAnime: PropTypes.func,
  keywordSearch: PropTypes.string,
  genresListData: PropTypes.array,
  location: PropTypes.object,
  searchConditions: PropTypes.object
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    userData: state.auth.userData,
    topAnimeData: state.anime.topAnimeData,
    genresListData: state.anime.genresListData,
    genreTopData: state.anime.genreTopData,
    topAnimeIsProcessing: state.anime.topAnimeIsProcessing,
    genresListIsProcessing: state.anime.genresListIsProcessing,
    genreTopIsProcessing: state.anime.genreTopIsProcessing,
    multipleGenreTopIsProcessing: state.anime.multipleGenreTopIsProcessing,
    animeByIdIsProcessing: state.anime.animeByIdIsProcessing,
    recentlyReviewedAnimeIsProcessing: state.anime.recentlyReviewedAnimeIsProcessing,
    recentReviewsIsProcessing: state.anime.recentReviewsIsProcessing,
    searchResult: state.search.searchResult,
    keywordSearch: state.search.keyword,
    searchConditions: state.search.conditions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(actions.logout()),
    tryAutoSignIn: () => dispatch(actions.authCheckState()),
    getTopAnime: (page, itemPerPage) =>
      dispatch(actions.getTopAnime(page, itemPerPage)),
    getGenresList: (page, itemPerPage) =>
      dispatch(actions.getGenresList(page, itemPerPage)),
    getGenreTop: (id, limit) => dispatch(actions.getGenreTop(id, limit)),
    getMultipleGenreTop: (idArr, limit) =>
      dispatch(actions.getMultipleGenreTop(idArr, limit)),
    getRecentlyReviewedAnime: (page, itemPerPage) =>
      dispatch(actions.getRecentlyReviewedAnime(page, itemPerPage)),
    getRecentReviews: (page, itemPerPage) =>
      dispatch(actions.getRecentReviews(page, itemPerPage)),
    clearSearchResult: () => dispatch(actions.clearSearchResult()),
    searchAnime: payload => dispatch(actions.searchAnime(payload))
  };
};

export default (
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
