import React, { Component } from 'react';
import { Dropdown, Icon, Menu, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import './Navbar.scss';


class Navbar extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    userData: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
  };



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
    const {isAuthenticated, userData, logout, show} = this.props;
    let authDiv = null;
    if(isAuthenticated){
      const userMenu = (
        <Menu>
          <Menu.Item key="0">
            <a href="#">{userData.email}</a>
          </Menu.Item>
          <Menu.Item key="1">
            <a href="#">My profile</a>
          </Menu.Item>
          <Menu.Item key="2">
            <a href="#">Settings</a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" onClick={logout}>Logout</Menu.Item>
        </Menu>
      );
      authDiv = (
        <div>
          <Dropdown overlay={userMenu} trigger={['click']} placement="bottomCenter">
            <div>
              <StyledAvatar size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                {userData.name.charAt(0).toUpperCase()}
              </StyledAvatar>
            </div>
          </Dropdown>
        </div>
      );
    }else{
      authDiv = (
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
      );
    }

    return (
      <NavContainer className="navbar" style={{transform: `translateY(${show?'0':'-100%'})`}}>
        <span className="navbar-toggle" onClick={this.toggleNavbar}>
          <Icon type="bars" theme="outlined" />
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
        {authDiv}
      </NavContainer>
    );
  }
}

const NavContainer = styled.nav`
  transform: translateY(${props => props.show ? '0' : '0'});
  
`;


const StyledAvatar = styled(Avatar)`
  &:hover{
    cursor: pointer;
  }
`;

export default Navbar;