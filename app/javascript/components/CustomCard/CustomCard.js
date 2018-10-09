import React, { Component } from "react";
import { Card, Row, Col, Icon } from "antd";
import styled from "styled-components";
import "./CustomCard.scss";
import CoverImage from "../../assets/images/placeholder.png";

import PropTypes from "prop-types";

class CustomCard extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    ratingNo: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired
  };

  handleImgError = e => {
    e.target.src = "https://image.ibb.co/djfJJp/placeholder.png";
  };

  render() {
    const { title, cover, ratingNo, score } = this.props;

    return (
      <div className="CustomCard">
        <img
          className="CustomCardCover"
          src={cover}
          onError={this.handleImgError}
        />
        <span className="CustomCardTitle">{title}</span>
        <span className="CustomCardRatingNo">
          <Icon type="message" theme="filled" />
          &nbsp;
          {ratingNo}
        </span>
        <span className="CustomCardScore">
          <StyledIcon type="star" theme="filled" />
          &nbsp;
          {score}
        </span>
      </div>
    );
  }
}

const StyledIcon = styled(Icon)`
  color: yellow;
`;

export default CustomCard;
