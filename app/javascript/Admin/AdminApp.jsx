import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';
import { NavLink, Route, Link } from 'react-router-dom';

import './AdminApp.scss';
import GenrePage from './Genre';
import AnimePage from './Anime';
import NotFoundPage from '../containers/NotFoundPage';
import { Switch } from 'react-router';

const {Header, Sider, Content} = Layout;

class AdminApp extends Component {
  state = {
    collapsed: false,
  };

  componentDidMount() {

  }

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
            <a href="/">
              {this.state.collapsed ? 'A' : 'AniRebi'}
            </a>
          </div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/admin/animes">
                <Icon type="ordered-list" theme="outlined"/>
                <span>Anime</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/admin/user">
                <Icon type="bar-chart" theme="outlined"/>
                <span>Review</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/admin/genres">
                <Icon type="tag" theme="outlined"/>
                <span>Genre</span>
              </Link>
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
              <Route path="/admin/genres" render={() => <GenrePage/>}/>
              <Route path="/admin/animes" render={() => <AnimePage/>}/>
              <Route render={() => <NotFoundPage/>}/>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isAdmin: state.auth.userData
  };
};


export default withRouter(
  connect(mapStateToProps, null)(AdminApp)
);
