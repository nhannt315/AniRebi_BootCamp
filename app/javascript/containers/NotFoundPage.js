import React, { Component } from 'react';
import { Layout } from 'antd';

const {Content} = Layout;

class NotFoundPage extends Component {

  render() {
    return (
      <Content className="NotFoundPageContent">
        404 Not Found
      </Content>
    );
  }
}

export default NotFoundPage;
