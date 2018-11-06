import React, { Component } from 'react';
import { Dropdown, Icon, Menu, Avatar } from 'antd';
import { Link, NavLink } from 'react-router-dom';
import debounce from 'lodash.debounce';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import './Navbar.scss';
import SearchMenu from '../SearchMenu';
import GenreListMenu from '../GenreListMenu';


class Navbar extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    userData: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    searchResult: PropTypes.array,
    searchAnime: PropTypes.func.isRequired,
    clearSearchResult: PropTypes.func.isRequired,
    keyword: PropTypes.string,
    history: PropTypes.object,
    location: PropTypes.object,
    genreList: PropTypes.array
  };

  state = {
    term: '',
    showNavMobile: false,
    showGenreList: false
  };

  constructor(props) {
    const {keyword, searchAnime} = props;
    super(props);
    this.debounceSearch = debounce(searchAnime, 300);
    if (keyword.length > 0) {
      this.setState({term: keyword});
    }
  }

  handleGenreClick = e => {
    e.preventDefault();
    this.setState(prevState => ({showGenreList: !prevState.showGenreList}));
  };

  handleOnChange = e => {
    let term = e.target.value;
    if (!term) {
      this.props.clearSearchResult();
      return this.setState({term: ''});
    }
    this.setState({term});
    term = term.replace(/\s+/g, '+');
    return this.debounceSearch({
      q: term,
      page: 1,
      itemPerPage: 20
    });
  };

  handleSearchFormSubmit = e => {
    e.preventDefault();
    let {term} = this.state;
    if (!term) {
      this.props.clearSearchResult();
      return;
    }
    this.debounceSearch({
      q: term,
      page: 1,
      itemPerPage: 20
    });
    this.props.history.push('/search');
  };

  render() {
    const {isAuthenticated, userData, logout, clearSearchResult, searchResult, genreList} = this.props;
    let authDiv = null;
    if (isAuthenticated) {
      const userMenu = (
        <Menu>
          <Menu.Item key="1">
            <Link to={`/profile/${userData.id}`}>My profile</Link>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="#">Settings</a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" onClick={logout}>Logout</Menu.Item>
        </Menu>
      );
      authDiv = (
        <div className="user">
          <Dropdown overlay={userMenu} trigger={['click']} placement="bottomCenter">
            <div>
              <StyledAvatar size="large" style={{color: '#f56a00', backgroundColor: '#fde3cf'}}>
                {userData.name.charAt(0).toUpperCase()}
              </StyledAvatar>
              <span className="user-name">{` ${userData.name}`}</span>
            </div>
          </Dropdown>
        </div>
      );
    } else {
      authDiv = (
        <div className="auth-btns">
          <Link to="/login" className="animating_link">
            <Icon type="login" theme="outlined"/>{' '}Log In
          </Link>
          <Link to="/register" className="animating_link">
            <Icon type="user" theme="outlined"/>{' '}Sign Up
          </Link>
        </div>
      );
    }

    return (
      <nav className="navbar">
        <div className="nav-logo">
          <Link to="/">
            AniRebi
          </Link>
        </div>
        <div className="searchBar">
          <div className="search-wrapper">
            <Icon type="search" theme="outlined"/>
            <form onSubmit={this.handleSearchFormSubmit}>
              <input
                type="text"
                placeholder="search for anime"
                value={this.state.term}
                onChange={this.handleOnChange}
              />
            </form>
          </div>
          {
            searchResult.length > 0 && this.props.location.pathname !== '/search' &&
            <SearchMenu
              history={this.props.history}
              searchResult={searchResult}
              clearSearchResult={clearSearchResult}
            />
          }
        </div>
        <div className="navRight">
          <ul className="nav-menu">
            <li>
              <Link to="/" className="animating_link" activeclassname="nav-menu-link-active">
                <Icon type="home" />{' '}Home
              </Link>
            </li>
            <li>
              <Link to="/anime" className="animating_link" activeclassname="nav-menu-link-active">
                <Icon type="bars" theme="outlined" />{' '}Anime
              </Link>
            </li>
            <li>
              <Link onClick={this.handleGenreClick} to="/genre"
                    className={'animating_link ' + (this.state.showGenreList ? 'nav-menu-link-active' : null)}
                    activeclassname="nav-menu-link-active">
                <Icon type="tags" theme="outlined"/>{' '}Gerne
              </Link>
              {genreList.length > 0 &&
              <GenreListMenu
                show={this.state.showGenreList}
                genreList={genreList}
                hideList={() => this.setState({showGenreList: false})}
              />}
            </li>
          </ul>
        </div>
        {authDiv}
      </nav>
    );
  }
}


const StyledAvatar = styled(Avatar)`
  &:hover{
    cursor: pointer;
  }
`;

export default Navbar;
