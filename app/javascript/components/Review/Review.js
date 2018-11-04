import {
  Col,
  Row,
  Divider,
  Icon,
  Rate,
  Avatar,
  Button,
  Input,
  Badge,
  Tooltip
} from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import './Review.scss';
import { callbackify } from 'util';

class Review extends Component {
  static propTypes = {
    userData: PropTypes.object.isRequired,
    userName: PropTypes.string.isRequired,
    reviewId: PropTypes.number.isRequired,
    reviewTitle: PropTypes.string.isRequired,
    reviewContent: PropTypes.string.isRequired,
    reviewScore: PropTypes.number.isRequired,
    likeNo: PropTypes.number.isRequired,
    dislikeNo: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
    handleEditReview: PropTypes.func.isRequired,
    handleDeleteReview: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      isEditFormOpen: false,
      reviewTitle: this.props.reviewTitle,
      reviewContent: this.props.reviewContent,
      reviewScore: this.props.reviewScore,
      likeNo: this.props.likeNo,
      dislikeNo: this.props.dislikeNo
    };
  }

  handleImgError = e => {
    e.target.src = 'https://image.ibb.co/djfJJp/placeholder.png';
  };

  toText = content => {
    return <p dangerouslySetInnerHTML={{ __html: content }} />;
  };

  onTitleChange = e => {
    this.setState({
      reviewTitle: e.target.value
    });
  };

  onContentChange = e => {
    this.setState({
      reviewContent: e.target.value
    });
  };

  onStarChange = value => {
    this.setState({
      reviewScore: value
    });
  };

  handleCancelClick = () => {
    this.setState({
      isEditFormOpen: false,
      reviewTitle: this.props.reviewTitle,
      reviewContent: this.props.reviewContent,
      reviewScore: this.props.reviewScore,
      likeNo: this.props.likeNo,
      dislikeNo: this.props.dislikeNo
    });
  };

  handleSaveClick = () => {
    if (this.state.reviewTitle === '' || this.state.reviewContent === '') {
      alert('All fields must be filled!');
    } else {
      var review = {
        userName: this.props.userData.name,
        reviewTitle: this.state.reviewTitle,
        reviewContent: this.state.reviewContent,
        reviewScore: this.state.reviewScore,
        likeNo: this.props.likeNo,
        dislikeNo: this.props.dislikeNo
      };
      this.props.handleEditReview(review);
      this.setState({
        isEditFormOpen: false
      });
    }
  };

  handleLikeClick = e => {
    this.setState({
      likeNo: this.state.likeNo + 1
    });
  };

  handleDislikeClick = e => {
    this.setState({
      dislikeNo: this.state.dislikeNo + 1
    });
  };

  handleDeleteClick = e => {
    var review = {
      userName: this.props.userName,
      reviewTitle: this.state.reviewTitle,
      reviewContent: this.state.reviewContent,
      reviewScore: this.state.reviewScore,
      likeNo: this.state.likeNo,
      dislikeNo: this.state.dislikeNo
    };
    this.props.handleDeleteReview(review);
  };

  handleEditClick = e => {
    if (this.state.isEditFormOpen) {
      this.setState({
        isEditFormOpen: false
      });
    } else {
      this.setState({
        isEditFormOpen: true
      });
    }
  };

  showDeleteConfirm = () => {
    confirm({
      title: 'Are you sure you want to delete this review?',
      content: 'Deleted reviews cannot be restored',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        this.handleDeleteClick();
      },
      onCancel() {}
    });
  };

  showEditConfirm = () => {
    confirm({
      title: 'Are you sure you want to edit this review?',
      content: 'Edited changes cannot be reverted',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        this.handleEditClick();
      },
      onCancel() {}
    });
  };

  render() {
    const {
      reviewTitle,
      reviewContent,
      likeNo,
      dislikeNo,
      reviewScore
    } = this.state;
    const { userData, userName } = this.props;
    if (!this.state.isEditFormOpen) {
      return (
        <div className="Review" style={{ width: '100%' }}>
          <Row>
            <Col span={4}>
              <div style={{ width: '100%', textAlign: 'center' }}>
                <StyledAvatar
                  size={100}
                  style={{
                    color: '#f56a00',
                    backgroundColor: '#fde3cf'
                  }}
                >
                  <span style={{ fontSize: '40px' }}>
                    {/* {userName.charAt(0).toUpperCase()} */}
                    Test
                  </span>
                </StyledAvatar>
              </div>
              &nbsp;
              <div
                style={{
                  textAlign: 'center',
                  fontSize: 'calc(1.5vw)'
                }}
              >
                {userName}
              </div>
            </Col>
            <Col span={19} offset={1}>
              <Row>
                <Col span={15}>
                  <div className="ReviewTitle">{reviewTitle}</div>
                </Col>
                <Col span={8} offset={1}>
                  <div
                    className="ReviewRating"
                    style={{
                      fontSize: 'calc(1.5vw)',
                      lineHeight: '0.5',
                      position: 'absolute',
                      right: '0',
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Rate
                      style={{
                        fontSize: 'calc(1.5vw)'
                      }}
                      disabled
                      defaultValue={reviewScore}
                    />
                    &nbsp;
                    <span>{reviewScore}</span>
                  </div>
                </Col>
              </Row>
              <StyledDivider />
              <div style={{ minHeight: '100px' }} className="ReviewContent">
                {reviewContent}
              </div>
              &nbsp;
              {userName !== userData.name && (
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
                    <Badge count={likeNo}>
                      <LikeIcon
                        type="like"
                        theme="filled"
                        onClick={this.handleLikeClick}
                      />
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
                    <Badge count={dislikeNo}>
                      <DislikeIcon
                        type="dislike"
                        theme="filled"
                        onClick={this.handleDislikeClick}
                      />
                    </Badge>
                    <span>{dislikeNo}</span>
                  </div>
                </div>
              )}
              {userName === userData.name && (
                <div>
                  <div
                    style={{
                      position: 'relative',
                      display: 'inline-flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Button type="primary" onClick={this.showEditConfirm}>
                      Edit
                    </Button>
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
                    <Button type="danger" onClick={this.showDeleteConfirm}>
                      Delete
                    </Button>
                  </div>
                </div>
              )}
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div className="EditForm" style={{ width: '100%' }}>
          <Row>
            <Col span={4}>
              <div style={{ width: '100%', textAlign: 'center' }}>
                <StyledAvatar
                  size={100}
                  style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                >
                  <span style={{ fontSize: '40px' }}>
                    {/* {userName.charAt(0).toUpperCase()} */}
                    Test
                  </span>
                </StyledAvatar>
              </div>
              &nbsp;
              <div style={{ textAlign: 'center', fontSize: 'calc(1.5vw)' }}>
                {userName}
              </div>
            </Col>
            <Col span={19} offset={1}>
              Rating: &nbsp;
              <div
                className="ReviewFormRating"
                style={{
                  lineHeight: '0.5',
                  position: 'relative',
                  right: '0',
                  display: 'inline-flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Rate
                  allowHalf
                  onChange={this.onStarChange}
                  value={reviewScore}
                />
                &nbsp;
                <span>{reviewScore} star(s)</span>
              </div>
              <StyledDivider />
              <span className="ReviewFormTitle">
                <Input
                  placeholder="Enter review's title"
                  value={reviewTitle}
                  onChange={this.onTitleChange}
                />
              </span>
              <StyledDivider />
              <div style={{ minHeight: '100px' }} className="ReviewFormContent">
                <Input.TextArea
                  placeholder="Enter review's content"
                  value={reviewContent}
                  onChange={this.onContentChange}
                />
              </div>
              <div>
                <div
                  style={{
                    position: 'relative',
                    display: 'inline-flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  <Button type="primary" onClick={this.handleSaveClick}>
                    Save
                  </Button>
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
                  <Button type="default" onClick={this.handleCancelClick}>
                    Cancel
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

const StyledAvatar = styled(Avatar)`
  &:hover {
    cursor: pointer;
  }
`;

const StyledDivider = styled(Divider)`
  margin-top: 8px !important;
  margin-bottom: 8px !important;
`;

const LikeIcon = styled(Icon)`
  font-size: 26px;
  &:hover {
    color: darkblue;
    cursor: pointer;
  }
`;

const mapStateToProps = state => {
  return {
    userData: state.auth.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const DislikeIcon = styled(Icon)`
  font-size: 26px;
  &:hover {
    color: darkred;
    cursor: pointer;
  }
`;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Review)
);
