import { Icon } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import './CustomCard.scss';

class CustomCard extends Component {
  static propTypes = {
    title: PropTypes.string,
    cover: PropTypes.string,
    ratingNo: PropTypes.number,
    score: PropTypes.number,
    history: PropTypes.object,
    id: PropTypes.number
  };

  handleImgError = e => {
    e.target.src = 'https://image.ibb.co/djfJJp/placeholder.png';
  };

  handleImgClick = e => {
    this.props.history.push('/anime/' + this.props.id);
  };

  render() {
    const { title, cover, ratingNo, score, staticContext, ...rest } = this.props;

    return (
      <div className="CustomCard" {...rest}>
        <img
          className="CustomCardCover"
          src={cover}
          onError={this.handleImgError}
          onClick={this.handleImgClick}
        />
        <span className="CustomCardTitle">{title}</span>
        <span className="CustomCardNumberOfReviews">
          <Icon type="message" theme="twoTone" />
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
  color: #fadb14;
`;

export default withRouter(CustomCard);
