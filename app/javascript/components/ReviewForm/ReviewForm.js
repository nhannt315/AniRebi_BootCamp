import { Col, Row, Divider, Icon, Input, Rate, Button, Avatar } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CardBox from '../CardBox/CardBox';
import * as actions from '../../store/actions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import './ReviewForm.scss';

class ReviewForm extends Component {
  static propTypes = {
    userData: PropTypes.object.isRequired,
    handleNewReviewSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      reviewTitle: '',
      reviewContent: '',
      reviewScore: 0,
      isSubmitBtnDisabled: false
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

  handleResetClick = () => {
    this.setState({
      reviewTitle: '',
      reviewContent: '',
      reviewScore: 0
    });
  };

  handleSubmitClick = () => {
    if (this.state.reviewTitle === '' || this.state.reviewContent === '') {
      alert('All fields must be filled!');
    } else {
      this.setState(
        {
          isSubmitBtnDisabled: true
        },
        () => {
          var review = {
            userName: this.props.userData.name,
            reviewTitle: this.state.reviewTitle,
            reviewContent: this.state.reviewContent,
            reviewScore: this.state.reviewScore,
            likeNo: 0,
            dislikeNo: 0
          };
          this.props.handleNewReviewSubmit(review, () => {
            this.setState({
              isSubmitBtnDisabled: false
            });
          });
        }
      );
    }
  };

  render() {
    const { userData } = this.props;
    const { reviewTitle, reviewContent, reviewScore } = this.state;
    return (
      <div className="ReviewForm">
        <CardBox
          title="Submit a review"
          content={
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
                      {userData.name.charAt(0).toUpperCase()}
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
                  {userData.name}
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
                <div
                  style={{ minHeight: '100px' }}
                  className="ReviewFormContent"
                >
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
                    <Button
                      type="primary"
                      loading={this.state.isSubmitBtnDisabled}
                      onClick={this.handleSubmitClick}
                    >
                      Submit
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
                    <Button type="default" onClick={this.handleResetClick}>
                      Reset
                    </Button>
                  </div>
                </div>
              </Col>
            </Row>
          }
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userData: state.auth.userData
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const StyledAvatar = styled(Avatar)`
  &:hover {
    cursor: pointer;
  }
`;

const StyledDivider = styled(Divider)`
  margin: 8px !important;
`;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReviewForm)
);
