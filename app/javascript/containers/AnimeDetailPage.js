import {
  Col,
  Layout,
  Row,
  Divider,
  Icon,
  Breadcrumb,
  Tag,
  Rate,
  message
} from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import BGImage from '../assets/images/background_home.png';
import CardBox from '../components/CardBox/CardBox';
import CustomVerticalList from '../components/CustomVerticalList/CustomVerticalList';
import * as actions from '../store/actions';
import ReviewsList from '../components/ReviewsList/ReviewsList';
import ReviewForm from '../components/ReviewForm/ReviewForm';
import axios from '../axios_anime';
import * as endpoints from '../constants/endpoint_constants';

const { Content } = Layout;

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
    tokenData: PropTypes.object.isRequired
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
      isSubmitBtnDisabled: false
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.state.reviewsList !== nextProps.reviewsData) {
      this.setState(
        {
          reviewsList: nextProps.reviewsData.slice()
        },
        () => {
          this.calculateAvgScore();
        }
      );
    }
    if (this.props.animeByIdData.id !== nextProps.animeByIdData.id) {
      var splits = this.props.history.location.pathname.split('/');
      this.props.getReviewsByAnime(splits[2]);
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
        response.data.review = { ...response.data.review, votes_for: [] };
        this.setState(
          {
            reviewsList: [...this.state.reviewsList, response.data.review]
          },
          () => {
            console.log(this.state.reviewsList);
            this.calculateAvgScore();
            callback();
            message.success('Submitted successfully', 3);
          }
        );
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
        console.log(review.reviewId);
        this.setState(
          {
            reviewsList: this.state.reviewsList.filter(
              i => i.id !== review.reviewId
            )
          },
          () => {
            console.log(this.state.reviewsList);
            this.calculateAvgScore();
            callback();
            message.success('Deleted successfully', 3);
          }
        );
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
        var newReviewsList = this.state.reviewsList.slice();
        var index = newReviewsList.findIndex(el => el.id === review.reviewId);
        console.log(index);
        newReviewsList[index] = {
          id: review.reviewId,
          user_id: this.props.userData.id,
          anime_id: this.props.animeByIdData.id,
          title: review.reviewTitle,
          content: review.reviewContent,
          rating: review.reviewScore,
          user_name: review.userName,
          like: review.likeNo,
          dislike: review.dislikeNo,
          created_at: review.createdAt,
          updated_at: review.updatedAt,
        };
        console.log(newReviewsList);
        this.setState(
          {
            reviewsList: newReviewsList
          },
          () => {
            console.log(this.state.reviewsList);
            this.calculateAvgScore();
            callback();
            message.success('Edited successfully', 3);
          }
        );
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

  render() {
    if (
      !this.props.animeByIdIsProcessing &&
      !this.props.reviewsByAnimeIsProcessing
    ) {
      const { animeByIdData, isAuthenticated } = this.props;

      const { animeScore } = this.state;

      // const FilteredBannerData = this.props.topAnimeData.filter(
      //   item => item.banner != null
      // );
      // // const BannerImages = FilteredBannerData.map(item => (
      // //   <StyledImg
      // //     key={item.id}
      // //     src={item.banner}
      // //     onError={this.handleBannerError}
      // //   />
      // // ));

      const AnimeGenres = this.props.animeByIdData.genres.map(item => (
        <Tag key={item.id}>{item.name}</Tag>
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
                      <StyledBreadcrumbItem href="/anime">
                        <Icon type="bars" /> Anime
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
                              fontSize: 'calc(1.5vw)'
                            }}
                          >
                            Rating
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
                            {animeScore} star(s)
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
                  }
                />
                &nbsp;
                <CardBox
                  title="Reviews"
                  content={
                    <div>
                      <ReviewsList
                        dataSource={this.state.reviewsList}
                        handleDeleteReview={this.handleDeleteReview}
                        handleEditReview={this.handleEditReview}
                      />
                    </div>
                  }
                />
                &nbsp;
                {isAuthenticated &&
                  !this.checkUserReviewed() && (
                    <ReviewForm
                      handleNewReviewSubmit={this.handleNewReviewSubmit}
                    />
                  )}
              </Col>
              <Col span={6} offset={1}>
                <CardBox
                  title="Ranking"
                  content={
                    <CustomVerticalList dataSource={this.props.topAnimeData} />
                  }
                />
              </Col>
            </Row>
          </Content>
        </StyledContent>
      );
    } else {
      return null;
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
    tokenData: state.auth.tokenData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAnimeById: id => dispatch(actions.getAnimeById(id)),
    getReviewsByAnime: id => dispatch(actions.getReviewsByAnime(id))
  };
};

// const StyledImg = styled.img`
//   width: 100%;
//   height: calc(31vw);
//   color: white;
//   text-align: center;
//   object-fit: cover;
// `;

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
