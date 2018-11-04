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
              reviewId={item.id}
              reviewTitle={item.title}
              reviewScore={item.rating}
              reviewContent={item.content}
              userName={item.user_name}
              likeNo={item.like}
              dislikeNo={item.dislike}
              createdAt={item.created_at}
              updatedAt={item.updated_at}
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
