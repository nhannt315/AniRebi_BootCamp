import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import styled from "styled-components";
import "./CustomList.scss";
import CoverImage from "../../assets/images/cover_placeholder.jpg";

import PropTypes from "prop-types";

class CustomList extends Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired
  };

  render() {
    const { dataSource } = this.props;

    const content = dataSource.map(item => (
      <Col span={3}>
        <Card hoverable cover={<img src={CoverImage} alt="cover" />}>
          <Card.Meta title={item.title} />
        </Card>
      </Col>
    ));

    return (
      <div className="CustomList">
        <Row type="flex" justify="space-around" align="middle">
          {content}
        </Row>
      </div>
    );
  }
}

export default CustomList;
