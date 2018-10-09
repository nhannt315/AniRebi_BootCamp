import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import styled from "styled-components";
import "./CustomList.scss";
import CoverImage from "../../assets/images/cover_placeholder.jpg";
import CustomCard from "../CustomCard/CustomCard";
import PropTypes from "prop-types";

class CustomList extends Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired
  };

  render() {
    const { dataSource } = this.props;

    const content = dataSource.map(item => (
      <CustomCard
        title={item.name}
        cover={item.cover_large}
        ratingNo="10,000"
        score="5.0"
      />
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
