import React, { Component } from 'react';
import { Row, Col, Avatar, Divider, Rate, Badge, Button, Icon, Modal } from 'antd';
import PropTypes from 'prop-types';
import moment from 'moment';

import './ReviewItem.scss';

class ReviewItem extends Component {
  static propTypes = {
    reviewId: PropTypes.number,
    userName: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    rating: PropTypes.number,
    like: PropTypes.number,
    dislike: PropTypes.number,
    updatedAt: PropTypes.string,
    handleDelete: PropTypes.func
  };



  showDeleteConfirm = () => {
    Modal.confirm({
      title: 'Are you sure you want to delete this review?',
      content: 'Deleted reviews cannot be restored',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk: () => {
        this.props.handleDelete(this.props.reviewId);
      },
      onCancel() {}
    });
  };

  parseDate = date => {
    var momentDate = moment(date);
    return momentDate.toDate().toDateString();
  };
  render() {
    const {userName, title, content, rating, like, dislike, updatedAt} = this.props;
    return (
      <div>
        <Row>
          <Col span={4}>
            <div className="user-avatar-wrapper">
              <Avatar
                className="user-avatar"
                size={60}
              >
                {userName && userName.charAt(0).toUpperCase()}
              </Avatar>
            </div>
            &nbsp;
            <div className="user-name">
              {userName}
            </div>
          </Col>
          <Col span={19} offset={1}>
            <Row>
              <Col span={14}>
                <div className="review-title">{title}</div>
              </Col>
              <Col span={9} offset={1}>
                <div className="review-rating">
                  <Rate
                    style={{
                      fontSize: 'calc(1.5vw)'
                    }}
                    disabled
                    allowHalf
                    defaultValue={rating}
                  />
                  &nbsp;
                  <span>{rating}</span>
                </div>
              </Col>
            </Row>
            <Divider style={{margin: '8x 0 8px 0 !important'}} />
            <div style={{ minHeight: '100px' }} className="ReviewContent">
              {content}
            </div>
            &nbsp;
            <div
              style={{
                marginTop: '15px'
              }}
            >
              <div
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Badge count={like} style={{ backgroundColor: '#52c41a' }}>
                  <Button
                    shape="circle"
                    disabled
                  >
                    <Icon type="like" theme="filled" />
                  </Button>
                </Badge>
              </div>
              <div
                style={{
                  position: 'relative',
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: '20px'
                }}
              >
                <Badge count={dislike}>
                  <Button
                    shape="circle"
                    disabled
                  >
                    <Icon type="dislike" theme="filled" />
                  </Button>
                </Badge>
              </div>
              <span>
                <div
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: '20px'
                  }}
                >
                  <Button
                    type="danger"
                    onClick={this.showDeleteConfirm}
                    shape="circle"
                    icon="delete"
                  />
                </div>
              </span>
              <div className="metadata">
                <Icon type="edit" />
                &nbsp;
                {this.parseDate(updatedAt)}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ReviewItem;