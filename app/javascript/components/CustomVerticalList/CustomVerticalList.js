import React, { Component } from "react";
import { Card, Row, Col, List, Icon } from "antd";
import styled from "styled-components";
import "./CustomVerticalList.scss";
import CoverImage from "../../assets/images/cover_placeholder.jpg";
import PropTypes from "prop-types";

class CustomVerticalList extends Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired
  };

  handleImgError = e => {
    e.target.src = "https://image.ibb.co/djfJJp/placeholder.png";
  };

  render() {
    const { dataSource } = this.props;

    return (
      <List
        dataSource={dataSource}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <img
                  className="VerticalListItemCover"
                  src={item.cover_large}
                  onError={this.handleImgError}
                />
              }
              title={<span class = "VerticalListItemTitle">{item.name}</span>}
              description={
                <span>
                  <span className="VerticalListItemRatingNo">
                    <Icon type="message" theme="twoTone" />
                    &nbsp;10,000
                  </span>
                  &nbsp; &nbsp;
                  <span className="VerticalListItemScore">
                    <StyledIcon type="star" theme="filled" />
                    &nbsp;5.0
                  </span>
                </span>
              }
            />
          </List.Item>
        )}
      />
    );
  }
}

const StyledIcon = styled(Icon)`
  color: yellow;
`;

export default CustomVerticalList;
