import React, { Component } from "react";
import { Layout, Menu, Breadcrumb, Input } from "antd";

const { Header, Content, Footer } = Layout;
const Search = Input.Search;

class SiteMenu extends Component {
  render() {
    return (
      <Header className="SiteMenu">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          style={{ lineHeight: "64px" }}
        >
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">Anime</Menu.Item>
          <Menu.Item key="3">Genres</Menu.Item>
          <Menu.Item>
            <Search
              placeholder="input search text"
              onSearch={value => console.log(value)}
              style={{ width: 200 }}
            />
          </Menu.Item>
        </Menu>
      </Header>
    );
  }
}

export default SiteMenu;
