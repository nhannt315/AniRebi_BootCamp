import React, { Component } from 'react';
import { Icon } from 'antd';
import { Link } from 'react-router-dom';
import './Navbar.scss';

class Navbar extends Component {
  state = {
    showNavMobile: false
  };

  toggleNavbar = () => {
    this.setState(prevState => ({
      showNavMobile: !prevState.showNavMobile
    }));
  };

  render() {
    const {showNavMobile} = this.state;
    return (
      <nav className="navbar">
        <span className="navbar-toggle" onClick={this.toggleNavbar}>
          <Icon type="bars" theme="outlined"/>
        </span>
        <Link className="logo" to="/">AniRebi</Link>
        <ul className={'main-nav' + (showNavMobile ? 'active' : '')}>
          <li>
            <Link className="nav-links" to="/">
              <Icon type="home" /> Home
            </Link>
          </li>
          <li>
            <Link className="nav-links" to="/anime">
              <Icon type="ordered-list" theme="outlined" /> Anime
            </Link>
          </li>
          <li>
            <Link className="nav-links" to="/genre">Genre</Link>
          </li>
        </ul>
        <div className="spacer" />
        <ul className="main-nav">
          <li>
            <Link className="nav-links" to="/login">
              <Icon type="login" theme="outlined" /> Login
            </Link>
          </li>
          <li>
            <Link className="nav-links" to="/register">
              <Icon type="user" theme="outlined" /> Register
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;