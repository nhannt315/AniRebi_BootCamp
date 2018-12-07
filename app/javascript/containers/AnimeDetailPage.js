import {
  Col,
  Layout,
  Row,
  Divider,
  Icon,
  Breadcrumb,
  Tag,
  Rate,
  message,
  Select,
  Button,
  Alert,
  Spin
} from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import BGImage from '../assets/images/background_home.png';
import CardBox from '../components/CardBox/CardBox';
import CustomVerticalList from '../components/CustomVerticalList/CustomVerticalList';
import * as actions from '../store/actions';
import ReviewsList from '../components/ReviewsList/ReviewsList';
import ReviewForm from '../components/ReviewForm/ReviewForm';
import axios from '../axios_anime';
import * as endpoints from '../constants/endpoint_constants';
import YouTube from 'react-youtube';

const { Content } = Layout;
const Option = Select.Option;

class AnimeDetailPage extends Component {
  static propTypes = {
    topAnimeData: PropTypes.array.isRequired,
    reviewsData: PropTypes.array.isRequired,
    genresListData: PropTypes.array.isRequired,
    genreTopData: PropTypes.object.isRequired,
    multipleGenreTopData: PropTypes.array.isRequired,
    animeByIdData: PropTypes.object,
    history: PropTypes.object.isRequired,
    getAnimeById: PropTypes.func.isRequired,
    getReviewsByAnime: PropTypes.func.isRequired,
    animeByIdIsProcessing: PropTypes.bool.isRequired,
    reviewsByAnimeIsProcessing: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    userData: PropTypes.object.isRequired,
    tokenData: PropTypes.object.isRequired,
    recentReviewsData: PropTypes.array.isRequired
  };

  constructor(props) {
    console.log('construct');
    super(props);
    var splits = this.props.history.location.pathname.split('/');
    this.props.getAnimeById(splits[2]);
    this.props.getReviewsByAnime(splits[2]);
    this.state = {
      reviewsList: [],
      animeScore: 0,
      isSubmitBtnDisabled: false,
      orderQuery: 'newest',
      orderSelect: 'date',
      orderIcon: 'caret-down',
      orderIconDisabled: false,
      orderBtnText: 'DESC',
      reviewsCount: 0
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.reviewsList !== nextProps.reviewsData) {
      this.setState(
        {
          reviewsList: nextProps.reviewsData.slice(),
          reviewsCount: nextProps.reviewsData.length
        },
        () => {
          this.calculateAvgScore();
        }
      );
    }
    if (this.props.animeByIdData.id !== nextProps.animeByIdData.id) {
      var splits = this.props.history.location.pathname.split('/');
      this.setState(
        {
          orderQuery: 'newest',
          orderSelect: 'date',
          orderIcon: 'caret-down',
          orderIconDisabled: false
        },
        () => {
          this.props.getReviewsByAnime(splits[2]);
        }
      );
    }
  }

  calculateAvgScore = () => {
    var totalScore = 0;
    for (var el in this.state.reviewsList) {
      totalScore += this.state.reviewsList[el].rating;
    }
    // console.log(totalScore);
    var avgScore = totalScore / this.state.reviewsList.length;
    avgScore = parseFloat((Math.round(avgScore * 2) / 2).toFixed(1));
    this.setState(
      {
        animeScore: isNaN(avgScore) ? 0 : avgScore
      },
      () => {
        // console.log(this.state.animeScore);
      }
    );
  };

  handleNewReviewSubmit = (review, callback) => {
    axios
      .post(
        endpoints.REVIEW_API,
        {
          user_id: this.props.userData.id,
          anime_id: this.props.animeByIdData.id,
          title: review.reviewTitle,
          content: review.reviewContent,
          rating: review.reviewScore,
          user_name: review.userName,
          like: 0,
          dislike: 0
        },
        {
          headers: {
            'access-token': this.props.tokenData.accessToken,
            'token-type': this.props.tokenData.tokenType,
            uid: this.props.tokenData.uid,
            client: this.props.tokenData.client
          }
        }
      )
      .then(response => {
        console.log(response);
        var splits = this.props.history.location.pathname.split('/');
        this.props.getReviewsByAnime(splits[2]);
        console.log(this.state.reviewsList);
        this.calculateAvgScore();
        callback();
        message.success('Submitted successfully', 3);
      });
  };

  handleDeleteReview = (review, callback) => {
    axios
      .delete(endpoints.REVIEW_API + `/${review.reviewId}`, {
        headers: {
          'access-token': this.props.tokenData.accessToken,
          'token-type': this.props.tokenData.tokenType,
          uid: this.props.tokenData.uid,
          client: this.props.tokenData.client
        }
      })
      .then(response => {
        console.log(response);
        var splits = this.props.history.location.pathname.split('/');
        this.props.getReviewsByAnime(splits[2]);
        console.log(this.state.reviewsList);
        this.calculateAvgScore();
        callback();
        message.success('Deleted successfully', 3);
      });
  };

  handleEditReview = (review, callback) => {
    axios
      .put(
        endpoints.REVIEW_API + `/${review.reviewId}`,
        {
          id: review.reviewId,
          user_id: this.props.userData.id,
          anime_id: this.props.animeByIdData.id,
          title: review.reviewTitle,
          content: review.reviewContent,
          rating: review.reviewScore,
          user_name: review.userName,
          like: review.likeNo,
          dislike: review.dislikeNo
        },
        {
          headers: {
            'access-token': this.props.tokenData.accessToken,
            'token-type': this.props.tokenData.tokenType,
            uid: this.props.tokenData.uid,
            client: this.props.tokenData.client
          }
        }
      )
      .then(response => {
        console.log(response);
        var splits = this.props.history.location.pathname.split('/');
        this.props.getReviewsByAnime(splits[2]);
        console.log(this.state.reviewsList);
        this.calculateAvgScore();
        callback();
        message.success('Edited successfully', 3);
      });
  };

  handleBannerError = e => {
    e.target.src = 'https://image.ibb.co/hnycB9/placeholder_large.png';
  };

  handleImgError = e => {
    e.target.src = 'https://image.ibb.co/djfJJp/placeholder.png';
  };

  toText = content => {
    return <p dangerouslySetInnerHTML={{ __html: content }} />;
  };

  checkUserReviewed = () => {
    var index = this.state.reviewsList.findIndex(
      el => el.user_id === this.props.userData.id
    );
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  };

  handleReviewsOrderChange = orderQuery => {
    console.log(orderQuery);
    var splits = this.props.history.location.pathname.split('/');
    this.props.getReviewsByAnime(splits[2], orderQuery);
  };

  onOrderIconClick = () => {
    if (this.state.orderIcon === 'caret-down') {
      this.setState({ orderIcon: 'caret-up', orderBtnText: 'ASC' }, () => {
        this.onOrderSelectChange(this.state.orderSelect);
      });
    } else {
      this.setState({ orderIcon: 'caret-down', orderBtnText: 'DESC' }, () => {
        this.onOrderSelectChange(this.state.orderSelect);
      });
    }
  };

  onOrderSelectChange = value => {
    var temp = value;
    if (value === 'date') {
      temp = this.state.orderIcon === 'caret-down' ? 'newest' : 'latest';
    } else if (value === 'rating') {
      temp =
        this.state.orderIcon === 'caret-down'
          ? value + '_highest'
          : value + '_lowest';
    }
    this.setState(
      {
        orderQuery: temp,
        orderSelect: value,
        orderIconDisabled:
          value === 'dislike' || value === 'like' ? true : false,
        orderIcon:
          value === 'dislike' || value === 'like'
            ? 'caret-down'
            : this.state.orderIcon,
        orderBtnText:
          value === 'dislike' || value === 'like'
            ? 'DESC'
            : this.state.orderBtnText
      },
      () => {
        this.handleReviewsOrderChange(this.state.orderQuery);
      }
    );
  };

  render() {
    if (!this.props.animeByIdIsProcessing) {
      const { animeByIdData, isAuthenticated } = this.props;

      const { animeScore, reviewsCount } = this.state;

      const AnimeGenres = this.props.animeByIdData.genres.map(item => (
        <Tag key={item.id}>
          <Link to={`/genre/${item.id}`}>{item.name}</Link>
        </Tag>
      ));

      return (
        <StyledContent className="AnimePageContent">
          <Content style={{ padding: '0px 100px 50px' }}>
            <Row>
              <Col span={17}>
                <CardBox
                  content={
                    <Breadcrumb>
                      <StyledBreadcrumbItem href="/">
                        <Icon type="home" /> Home
                      </StyledBreadcrumbItem>
                      <StyledBreadcrumbItem href="">
                        {animeByIdData.name}
                      </StyledBreadcrumbItem>
                    </Breadcrumb>
                  }
                />
                &nbsp;
                <CardBox
                  content={
                    <div>
                      <Row>
                        <Col span={8}>
                          <Row>
                            <div
                              className="AnimeDetailCoverImgContainer"
                              style={{ overflow: 'hidden' }}
                            >
                              <AnimeDetailCoverImg
                                className="AnimeDetailCoverImg"
                                src={animeByIdData.cover_large}
                                onError={this.handleImgError}
                              />
                            </div>
                            &nbsp;
                            <div
                              style={{
                                textAlign: 'center',
                                fontSize: 'calc(2vw)'
                              }}
                            >
                              Rating: {parseFloat(animeScore).toFixed(1)}
                            </div>
                            <div
                              style={{
                                textAlign: 'center'
                              }}
                            >
                              <Rate
                                disabled
                                value={animeScore}
                                allowHalf={true}
                                style={{
                                  fontSize: 'calc(2.5vw)'
                                }}
                              />
                            </div>
                            <div
                              style={{
                                textAlign: 'center',
                                fontSize: 'calc(1vw)'
                              }}
                            >
                              <Icon type="user" /> Reviews: {reviewsCount}
                            </div>
                          </Row>
                        </Col>

                        <Col span={15} offset={1}>
                          <div>
                            <strong
                              style={{
                                fontSize: 'calc(2.5vw)'
                              }}
                            >
                              {animeByIdData.name}
                            </strong>
                          </div>
                          &nbsp;
                          <div>
                            <strong>
                              <Icon
                                type="desktop"
                                style={{ color: 'blue' }}
                                theme="outlined"
                              />{' '}
                              ENGLISH TITLE:{' '}
                            </strong>
                            {animeByIdData.name}
                          </div>
                          <StyledDivider dashed />
                          <div>
                            <strong>
                              <Icon
                                type="copy"
                                style={{ color: 'orange' }}
                                theme="outlined"
                              />{' '}
                              JAPANESE TITLE:{' '}
                            </strong>
                            {animeByIdData.title_native}
                          </div>
                          <StyledDivider dashed />
                          <div>
                            <strong>
                              <Icon
                                type="tags"
                                style={{ color: 'red' }}
                                theme="outlined"
                              />{' '}
                              GENRE(S):{' '}
                            </strong>
                            {AnimeGenres}
                          </div>
                          <StyledDivider dashed />
                          <div>
                            <strong>
                              <Icon
                                type="info-circle"
                                style={{ color: 'teal' }}
                                theme="outlined"
                              />{' '}
                              STATUS:{' '}
                            </strong>
                            {animeByIdData.status}
                          </div>
                          <StyledDivider dashed />
                          <div style={{ whiteSpace: 'pre-line' }}>
                            <strong>
                              <Icon
                                type="read"
                                style={{ color: 'green' }}
                                theme="outlined"
                              />{' '}
                              PLOT SYNOPSIS:{' '}
                            </strong>
                            {this.toText(animeByIdData.info)}
                          </div>
                        </Col>
                      </Row>
                      <Row>
                        <StyledDivider dashed />
                        <div style={{ whiteSpace: 'pre-line' }}>
                          <strong>
                            <Icon
                              type="play-circle"
                              style={{ color: 'maroon' }}
                              theme="outlined"
                            />{' '}
                            PREVIEW:{' '}
                          </strong>
                          <br />
                          <br />
                          <div style={{textAlign: 'center'}}>
                            <YouTube
                              videoId={
                                this.props.animeByIdData.video_url.split('=')[1]
                              }
                            />
                          </div>
                        </div>
                      </Row>
                    </div>
                  }
                />
                &nbsp;
                <CardBox
                  title="Reviews"
                  content={
                    <div>
                      Sort by:{' '}
                      <Select
                        value={this.state.orderSelect}
                        style={{ width: 100 }}
                        onChange={this.onOrderSelectChange}
                      >
                        <Option value="date">Date</Option>
                        <Option value="rating">Rating</Option>
                        <Option value="like">Like</Option>
                        <Option value="dislike">Dislike</Option>
                      </Select>
                      &nbsp;
                      <Button
                        disabled={this.state.orderIconDisabled}
                        size="small"
                        onClick={this.onOrderIconClick}
                      >
                        {this.state.orderBtnText}
                        <Icon type={this.state.orderIcon} />
                      </Button>
                      <br /> <br />
                      {!this.props.reviewsByAnimeIsProcessing && (
                        <ReviewsList
                          dataSource={this.state.reviewsList}
                          handleDeleteReview={this.handleDeleteReview}
                          handleEditReview={this.handleEditReview}
                          handleReviewsOrderChange={
                            this.handleReviewsOrderChange
                          }
                        />
                      )}
                      {this.props.reviewsByAnimeIsProcessing && (
                        <div style={{ textAlign: 'center' }}>
                          <Spin
                            size="large"
                            indicator={<Icon type="loading" spin />}
                          />
                        </div>
                      )}
                    </div>
                  }
                />
                &nbsp;
                {isAuthenticated && !this.checkUserReviewed() && (
                  <ReviewForm
                    handleNewReviewSubmit={this.handleNewReviewSubmit}
                  />
                )}
              </Col>
              <Col span={6} offset={1}>
                <CardBox
                  title="Suggested Anime"
                  content={
                    <CustomVerticalList
                      dataSource={animeByIdData.suggest_animes}
                    />
                  }
                />
              </Col>
            </Row>
          </Content>
        </StyledContent>
      );
    } else {
      return (
        <StyledContent className="AnimePageContent">
          <Content style={{ padding: '0px 100px 50px' }}>
            <div style={{ height: '100vh', position: 'relative' }}>
              <Alert
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
                message="Please wait"
                description="Page is loading..."
                type="info"
                showIcon
                icon={
                  <Spin
                    size="large"
                    indicator={
                      <Icon type="loading" style={{ fontSize: 24 }} spin />
                    }
                  />
                }
              />
            </div>
          </Content>
        </StyledContent>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    topAnimeData: state.anime.topAnimeData,
    reviewsData: state.anime.reviewsData,
    animeByIdData: state.anime.animeByIdData,
    genresListData: state.anime.genresListData,
    genreTopData: state.anime.genreTopData,
    multipleGenreTopData: state.anime.multipleGenreTopData,
    animeByIdIsProcessing: state.anime.animeByIdIsProcessing,
    reviewsByAnimeIsProcessing: state.anime.reviewsByAnimeIsProcessing,
    isAuthenticated: state.auth.isAuthenticated,
    userData: state.auth.userData,
    tokenData: state.auth.tokenData,
    recentReviewsData: state.anime.recentReviewsData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAnimeById: id => dispatch(actions.getAnimeById(id)),
    getReviewsByAnime: (id, order) =>
      dispatch(actions.getReviewsByAnime(id, order))
  };
};

// const StyledImg = styled.img`
//   width: 100%;
//   height: calc(31vw);
//   color: white;
//   text-align: center;
//   object-fit: cover;
// `;

const RecentReviewTitle = styled.a`
  font-weight: bold;
  font-size: calc(1.1vw);
  color: rgba(0, 0, 0, 0.65) !important;
`;

const RecentReviewDescription = styled.div`
  font-size: calc(1vw);
`;

const AnimeDetailCoverImg = styled.img`
  border-color: white;
  border-width: 2px 2px 2px 2px;
  border-style: solid;
  border-radius: 2px 2px 2px 2px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 5px 0 rgba(0, 0, 0, 0.19);
  width: 100%;
  height: auto;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.25);
  }
`;

const StyledContent = styled(Content)`
  padding-top: 10px;
  background-image: url(${BGImage});
`;

const StyledDivider = styled(Divider)`
  margin-top: 8px !important;
  margin-bottom: 8px !important;
`;

// const StyledIcon = styled(Icon)`
//   color: yellow;
//   margin: 1px;
// `;

const StyledBreadcrumbItem = styled(Breadcrumb.Item)`
  color: black !important;
  &:hover {
    color: #df691a !important;
  }
`;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AnimeDetailPage)
);
