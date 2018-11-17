import React, { Component } from 'react';
import axios from '../axios_admin';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { message, Pagination, List, Skeleton } from 'antd';
import PropTypes from 'prop-types';

import './ReviewPage.scss';
import ReviewItem from './ReviewItem';
import * as endpoints from '../../constants/endpoint_constants';


class ReviewPage extends Component {

  static propTypes = {
    tokenData: PropTypes.object,
    userData: PropTypes.object
  };

  state = {
    reviewList: [],
    total: 0,
    initLoading: false,
    listLoading: false,
    listError: null,
    page: 1,
    perPage: 5
  };

  componentDidMount() {
    this.setState({initLoading: true}, () => this.getReviewList());
  }

  getReviewList = () => {
    this.setState({listLoading: true});
    axios.get(`/api/v1/reviews?page=${this.state.page}&item_per_page=${this.state.perPage}`)
      .then(response => new Promise(resolve => setTimeout(() => resolve(response), 1000)))
      .then(response => {
        this.setState({
          reviewList: response.data.reviews,
          total: response.data.total,
          listLoading: false,
          initLoading: false
        });
      })
      .catch(error => {
        this.setState({listError: error.data, listLoading: false, initLoading: false});
      });
  };

  handleDelete = (reviewId) => {
    console.log('delete', reviewId);
    axios
      .delete(endpoints.REVIEW_API + `/${reviewId}`, {
        headers: {
          'access-token': this.props.tokenData.accessToken,
          'token-type': this.props.tokenData.tokenType,
          uid: this.props.tokenData.uid,
          client: this.props.tokenData.client
        }
      })
      .then(() => {
        message.success('Review was deleted successfully!');
        this.getReviewList();
      });
  };

  onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    this.setState({page: current, perPage: pageSize}, () => this.getReviewList());
  };

  onPageChange = (page, pageSize) => {
    console.log(page, pageSize);
    this.setState({page: page, perPage: pageSize}, () => this.getReviewList());
  };

  render() {
    const {reviewList, listLoading, initLoading} = this.state;
    return (
      <React.Fragment>
        <div className="pagination-review">
          <Pagination
            showSizeChanger showQuickJumper onShowSizeChange={this.onShowSizeChange}
            defaultCurrent={1} total={this.state.total} size="small" pageSize={this.state.perPage}
            onChange={this.onPageChange} pageSizeOptions={['5', '10', '15']}
          />
        </div>
        <div>
          <List
            itemLayout="vertical"
            size="large"
            loading={initLoading}
            dataSource={reviewList}
            renderItem={review => (
              <List.Item key={review.id}>
                <Skeleton loading={listLoading} active avatar>
                  <ReviewItem
                    key={review.id}
                    reviewId={review.id}
                    userName={review.user_name}
                    title={review.title}
                    content={review.content}
                    rating={review.rating}
                    dislike={review.dislike}
                    like={review.like}
                    updatedAt={review.updated_at}
                    handleDelete={this.handleDelete}
                  />
                </Skeleton>
              </List.Item>
            )}
          >
          </List>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.auth.userData,
  tokenData: state.auth.tokenData
});

export default withRouter(
  connect(mapStateToProps)(
    ReviewPage
  )
);