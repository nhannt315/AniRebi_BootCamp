import { List, Select, Button } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './ReviewsList.scss';
import Review from '../Review/Review';

const Option = Select.Option;

class ReviewsList extends Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    handleEditReview: PropTypes.func.isRequired,
    handleDeleteReview: PropTypes.func.isRequired,
    handleReviewsOrderChange: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      pageSize: 5,
    };
  }

  handleImgError = e => {
    e.target.src = 'https://image.ibb.co/djfJJp/placeholder.png';
  };

  onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    this.setState({ pageSize: pageSize });
  };

  render() {
    const { dataSource, handleEditReview, handleDeleteReview } = this.props;
    return (
      <List
        dataSource={dataSource}
        pagination={{
          onChange: page => {
            console.log(page);
          },
          size: 'small',
          pageSize: this.state.pageSize,
          pageSizeOptions: ['5', '10', '15'],
          showSizeChanger: true,
          onShowSizeChange: this.onShowSizeChange
        }}
        renderItem={item => (
          <List.Item key={item.id}>
            <Review
              reviewId={item.id}
              reviewTitle={item.title}
              reviewScore={item.rating}
              reviewContent={item.content}
              votesFor={item.votes_for}
              userName={item.user_name}
              userId={item.user_id}
              likeNo={item.like}
              dislikeNo={item.dislike}
              createdAt={item.created_at}
              updatedAt={item.updated_at}
              animeName = {item.anime_name}
              animeId = {item.anime_id}
              handleEditReview={handleEditReview}
              handleDeleteReview={handleDeleteReview}
              history = {this.props.history}
            />
          </List.Item>
        )}
      />
    );
  }
}

export default ReviewsList;
