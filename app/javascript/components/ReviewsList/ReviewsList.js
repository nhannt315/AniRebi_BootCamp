import { Icon, List, Rate } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import './ReviewsList.scss';
import * as actions from '../../store/actions';
import Review from '../Review/Review';

class ReviewsList extends Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    handleEditReview: PropTypes.func.isRequired,
    handleDeleteReview: PropTypes.func.isRequired
  };

  handleImgError = e => {
    e.target.src = 'https://image.ibb.co/djfJJp/placeholder.png';
  };

  render() {
    const { dataSource, handleEditReview, handleDeleteReview } = this.props;

    return (
      <List
        dataSource={dataSource}
        renderItem={item => (
          <List.Item>
            <Review
              reviewTitle={item.reviewTitle}
              reviewScore={item.reviewScore}
              reviewContent={item.reviewContent}
              userAvatar={item.userAvatar}
              userName={item.userName}
              likeNo={item.likeNo}
              dislikeNo={item.dislikeNo}
              handleEditReview={handleEditReview}
              handleDeleteReview={handleDeleteReview}
            />
          </List.Item>
        )}
      />
    );
  }
}

export default ReviewsList;
