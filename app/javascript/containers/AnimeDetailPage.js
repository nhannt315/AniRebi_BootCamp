import {
  Carousel,
  Col,
  Layout,
  Row,
  Divider,
  Icon,
  Breadcrumb,
  Tag
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

const {Content} = Layout;

class AnimeDetailPage extends Component {
  static propTypes = {
    topAnimeData: PropTypes.array.isRequired,
    genresListData: PropTypes.array.isRequired,
    genreTopData: PropTypes.object.isRequired,
    multipleGenreTopData: PropTypes.array.isRequired,
    animeByIdData: PropTypes.object,
    history: PropTypes.object.isRequired,
    getAnimeById: PropTypes.func.isRequired,
    animeByIdIsProcessing: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    var splits = this.props.history.location.pathname.split('/');
    this.props.getAnimeById(splits[2]);
  }

  handleBannerError = e => {
    e.target.src = 'https://image.ibb.co/hnycB9/placeholder_large.png';
  };

  handleImgError = e => {
    e.target.src = 'https://image.ibb.co/djfJJp/placeholder.png';
  };

  toText = content => {
    return <p dangerouslySetInnerHTML={{__html: content}}/>;
  };

  render() {
    if (!this.props.animeByIdIsProcessing) {
      const {animeByIdData} = this.props;

      const FilteredBannerData = this.props.topAnimeData.filter(
        item => item.banner != null
      );
      const BannerImages = FilteredBannerData.map(item => (
        <StyledImg
          key={item.id}
          src={item.banner}
          onError={this.handleBannerError}
        />
      ));

      const AnimeGenres = this.props.animeByIdData.genres.map(item => (
        <Tag key={item.id}>{item.name}</Tag>
      ));

      return (
        <StyledContent className="AnimePageContent">
          <Content style={{padding: '0px 100px 50px'}}>
            <Row>
              <Col span={17}>
                <CardBox
                  content={
                    <Breadcrumb>
                      <StyledBreadcrumbItem href="/">
                        <Icon type="home"/> Home
                      </StyledBreadcrumbItem>
                      <StyledBreadcrumbItem href="/anime">
                        <Icon type="bars"/> Anime
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
                          <div className="AnimeDetailCoverImgContainer" style={{overflow: 'hidden'}}>
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
                            Rating:{' '}
                          </div>
                          <div
                            style={{
                              textAlign: 'center',
                              fontSize: 'calc(2.5vw)'
                            }}
                          >
                            <StyledIcon type="star" theme="filled"/>

                            <StyledIcon type="star" theme="filled"/>

                            <StyledIcon type="star" theme="filled"/>

                            <StyledIcon type="star" theme="filled"/>

                            <StyledIcon type="star" theme="filled"/>
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
                              style={{color: 'blue'}}
                              theme="outlined"
                            />{' '}
                            NAME:{' '}
                          </strong>
                          {animeByIdData.name}
                        </div>
                        <StyledDivider dashed/>
                        <div>
                          <strong>
                            <Icon
                              type="copy"
                              style={{color: 'orange'}}
                              theme="outlined"
                            />{' '}
                            OTHER NAMES:{' '}
                          </strong>
                          {animeByIdData.title_native}
                        </div>
                        <StyledDivider dashed/>
                        <div>
                          <strong>
                            <Icon
                              type="tags"
                              style={{color: 'red'}}
                              theme="outlined"
                            />{' '}
                            GENRE(S):{' '}
                          </strong>
                          {AnimeGenres}
                        </div>
                        <StyledDivider dashed/>
                        <div>
                          <strong>
                            <Icon
                              type="loading"
                              style={{color: 'teal'}}
                              theme="outlined"
                            />{' '}
                            STATUS:{' '}
                          </strong>
                          {animeByIdData.status}
                        </div>
                        <StyledDivider dashed/>
                        <div style={{whiteSpace: 'pre-line'}}>
                          <strong>
                            <Icon
                              type="read"
                              style={{color: 'green'}}
                              theme="outlined"
                            />{' '}
                            INFO:{' '}
                          </strong>
                          {this.toText(animeByIdData.info)}
                        </div>
                      </Col>
                    </Row>
                  }
                />
              </Col>
              <Col span={6} offset={1}>
                <CardBox
                  title="Ranking"
                  content={
                    <CustomVerticalList dataSource={this.props.topAnimeData}/>
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
    animeByIdData: state.anime.animeByIdData,
    genresListData: state.anime.genresListData,
    genreTopData: state.anime.genreTopData,
    multipleGenreTopData: state.anime.multipleGenreTopData,
    animeByIdIsProcessing: state.anime.animeByIdIsProcessing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAnimeById: id => dispatch(actions.getAnimeById(id))
  };
};

const StyledImg = styled.img`
  width: 100%;
  height: calc(31vw);
  color: white;
  text-align: center;
  object-fit: cover;
`;

const AnimeDetailCoverImg = styled.img`
  border-color: white;
  border-width: 2px 2px 2px 2px;
  border-style: solid;
  border-radius: 2px 2px 2px 2px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 5px 0 rgba(0, 0, 0, 0.19);
  width: 100%;
  height: auto;
  transition: all .5s;
  &:hover {
    transform: scale(1.25);
  }
`;

const StyledContent = styled(Content)`
  padding-top: 10px;
  background-image: url(${BGImage});
`;

const StyledDivider = styled(Divider)`
  margin: 8px !important;
`;

const StyledIcon = styled(Icon)`
  color: yellow;
  margin: 1px;
`;

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
