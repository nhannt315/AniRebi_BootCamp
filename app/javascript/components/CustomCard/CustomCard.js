import { Icon } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import './CustomCard.scss';

class CustomCard extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    ratingNo: PropTypes.string.isRequired,
    score: PropTypes.string.isRequired,
    history: PropTypes.object,
    id: PropTypes.number.isRequired
  };

  handleImgError = e => {
    e.target.src = 'https://image.ibb.co/djfJJp/placeholder.png';
  };

  handleImgClick = e => {
    this.props.history.push('/anime/' + this.props.id);
  };

  render() {
    const { title, cover, ratingNo, score } = this.props;

    return (
      <div className="CustomCard" {...this.props}>
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
