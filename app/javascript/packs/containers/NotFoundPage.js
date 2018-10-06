import React, { Component } from "react";
import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

class NotFoundPage extends Component {

  render() {
    return(
      <Content className="NotFoundPageContent">
        404 Not Found
      </Content>
    );
  }
}

export default NotFoundPage;
