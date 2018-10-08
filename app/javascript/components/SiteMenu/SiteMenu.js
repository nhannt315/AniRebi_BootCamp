import React, { Component } from 'react';
import { Layout, Menu, Input, Divider, Avatar, Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const {Header} = Layout;
const Search = Input.Search;


class SiteMenu extends Component {
  static propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    userData: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  };
  render() {
    const {isAuthenticated, userData, logout} = this.props;
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
          <Menu.Item key="1">
            <a href="#">Settings</a>
          </Menu.Item>
          <Menu.Divider />
          <Menu.Item key="3" onClick={logout}>Logout</Menu.Item>
        </Menu>
      );
      authDiv = (
        <UserInfoDiv>
          <Dropdown overlay={userMenu} trigger={['click']} placement="bottomCenter">
            <div>
              <StyledAvatar size="large" style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>
                {userData.name.charAt(0).toUpperCase()}
              </StyledAvatar>
              <span style={{marginLeft: '.5rem', color: 'red', textTransform: 'uppercase'}}>{userData.name}</span>
            </div>
          </Dropdown>
        </UserInfoDiv>
      );
    }else{
      authDiv = (
        <AuthDiv>
          <ul>
            <li><Link to="/login">Login</Link></li>
            <li><Divider type="vertical" /></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </AuthDiv>
      );
    }
    return (
      <StyledHeader className="">
        <StyledMenu
          mode="horizontal"
          defaultSelectedKeys={['1']}
        >
          <StyledMenuItem key="1">
            <Link to="/">Home</Link>
          </StyledMenuItem>
          <StyledMenuItem key="2">
            <Link to="/anime">Anime</Link>
          </StyledMenuItem>
          <StyledMenuItem key="3">
            <Link to="/genre">Genres</Link>
          </StyledMenuItem>
          <StyledMenuItem>
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              style={{}}
            />
          </StyledMenuItem>
        </StyledMenu>
        <div style={{flex: 1}} />
        {authDiv}
      </StyledHeader>
    );
  }
}

const StyledAvatar = styled(Avatar)`
  &:hover{
    cursor: pointer;
  }
`;

const UserInfoDiv = styled.div`
  margin: 0;
  padding: 0;
`;

const StyledMenu = styled(Menu)`
  display: inline-block;
  height: 100%;
  left: 1rem;
`;

const StyledHeader = styled(Header)`
  height: 62px;
  position: fixed;
  width: 100vw;
  display: flex;
  background-color: white;
  box-shadow: 1px 1px 3px 0;
  z-index: 1;
`;

const StyledMenuItem = styled(Menu.Item)`
  height: 100%;
  padding-top: .4rem;
`;

const AuthDiv = styled.div`
  height: 100%;
  float: right;
  text-align: center;
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex; 
    li {
      padding: 0 .5rem;
      a{
        display: inline-block;
        height: 100%;
        text-align: center;
        color: black;
        text-decoration: none;
        &:hover {
          color: blue;
        }
      }
    }
  }
`;

export default SiteMenu;
