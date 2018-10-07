import React, { Component } from 'react';
import { Layout, Menu, Input, Divider } from 'antd';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const {Header} = Layout;
const Search = Input.Search;


class SiteMenu extends Component {
  render() {
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
              style={{width: 200}}
            />
          </StyledMenuItem>
        </StyledMenu>
        <AuthDiv>
          <Link to="/login">Login</Link>
          <Divider type="vertical" />
          <Link to="/register">Register</Link>
        </AuthDiv>
      </StyledHeader>
    );
  }
}

const StyledMenu = styled(Menu)`
  display: inline-block;
  height: 100%;
  left: 1rem;
`;

const StyledHeader = styled(Header)`
  height: 62px;
  position: fixed;
  width: 100vw;
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
`;

export default SiteMenu;
