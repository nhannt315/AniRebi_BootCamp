import React, { Component } from 'react';

import { Layout, Menu, Icon } from 'antd';
import { NavLink, Route } from 'react-router-dom';

import './AdminApp.scss';
import GenrePage from './Genre';
import NotFoundPage from '../containers/NotFoundPage';
import { Switch } from 'react-router';

const {Header, Sider, Content} = Layout;

class AdminApp extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout style={{minHeight: '100vh'}}>
        <Sider
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="logo">
            <NavLink to="/">
              {this.state.collapsed ? 'A' : 'AniRebi'}
            </NavLink>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <NavLink to="/admin/user">
                <Icon type="ordered-list" theme="outlined"/>
                <span>Anime</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink to="/admin/user">
                <Icon type="bar-chart" theme="outlined"/>
                <span>Review</span>
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink to="/admin/user">
                <Icon type="tag" theme="outlined"/>
                <span>Genre</span>
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{background: '#fff', padding: 0}}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{padding: 24, background: '#fff', minHeight: 280}}>
            <Switch>
              <Route exact path="/admin/genres" to={GenrePage} render={() => <GenrePage />} />
              <Route render={() => <NotFoundPage />} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}


export default AdminApp;
