import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Breadcrumb, Col, Icon, Layout, Row } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import InfiniteScroll from 'react-infinite-scroller';

import * as actions from '../store/actions';
import BGImage from '../assets/images/background_home.png';
import CardBox from '../components/CardBox';
import CustomVerticalList from '../components/CustomVerticalList';
import CustomCard from '../components/CustomCard/CustomCard';
import Loader from '../components/Loader';
import AnimeItem from '../components/AnimeItemHorizontal';

const {Content} = Layout;


class GenreDetailPage extends Component {
  static propTypes = {
    topAnimeData: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    getGenreById: PropTypes.func.isRequired,
    genreDetail: PropTypes.object,
    genreDetailLoading: PropTypes.bool,
    animeList: PropTypes.array,
    page: PropTypes.number,
    loading: PropTypes.bool,
    getAnimeList: PropTypes.func,
    totalAnime: PropTypes.number,
    clearAnimeList: PropTypes.func
  };

  state = {
    genreId: null,
    isGrid: false
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const currentId = prevState.genreId;
    const nextId = nextProps.match.params.id;
    if (currentId !== nextId) {
      nextProps.clearAnimeList();
    }
    return {
      ...prevState,
      genreId: nextId
    };
  }

  constructor(props) {
    super(props);
    this.props.clearAnimeList();
  }

  changeLayout = () => {
    this.setState(prevState => ({isGrid: !prevState.isGrid}));
  };

  getAnimeList = () => {
    const {getAnimeList, page} = this.props;
    getAnimeList(this.state.genreId, page);
  };

  componentDidMount() {
    const genreId = this.props.match.params.id;
    this.setState({genreId: genreId}, () => this.getAnimeList());
  }

  render() {
    const {topAnimeData, animeList, totalAnime, genreDetail} = this.props;
    const gridList = (
      <GridWrapper>
        {animeList && animeList.map(anime => (
          <CustomCard
            style={{margin: '0 4px 5px 4px'}}
            id={anime.id}
            key={anime.id}
            title={anime.name}
            cover={anime.cover_large}
            ratingNo="10,000"
            score="5.0"
          />
        ))}
      </GridWrapper>
    );
    const horizontalList = (
      <ListWrapper>
        {animeList && animeList.map(anime => (
          <AnimeItem key={anime.id} anime={anime}/>
        ))}
      </ListWrapper>
    );
    return (
      <StyledContent>
        <Content style={{padding: '0px 100px 50px'}}>
          <Row>
            <Col span={17}>
              <CardBox
                content={
                  <div>
                    <Breadcrumb style={{float: 'left'}}>
                      <StyledBreadcrumbItem href="/">
                        <Icon type="home"/> Home
                      </StyledBreadcrumbItem>
                      <StyledBreadcrumbItem href="/anime">
                        <Icon type="bars"/> Genre
                      </StyledBreadcrumbItem>
                      <StyledBreadcrumbItem href="">
                        {genreDetail && genreDetail.name}
                      </StyledBreadcrumbItem>
                    </Breadcrumb>
                    {this.state.isGrid ?
                      <Icon onClick={this.changeLayout} style={{float: 'right', fontSize: '24px'}} type="appstore" theme="outlined"/>
                      :
                      <Icon onClick={this.changeLayout} style={{float: 'right', fontSize: '24px'}} type="ordered-list" theme="outlined"/>}

                    <span style={{clear: 'both', display: 'block'}}/>
                  </div>
                }
              />
              &nbsp;
              <CardBox
                style={{height: '100%'}}
                content={
                  <InfiniteScroll
                    pageStart={1}
                    loadMore={this.getAnimeList}
                    hasMore={animeList.length < totalAnime}
                    useWindow={true}
                    loader={<Loader key="unique-key"/>}
                    style={{
                      height: '100%',
                      overflow: 'visible',
                    }}
                  >
                    {this.state.isGrid ? gridList : horizontalList}
                  </InfiniteScroll>
                }
              />
            </Col>
            <Col span={6} offset={1}>
              <CardBox
                title="Ranking"
                content={
                  <CustomVerticalList dataSource={topAnimeData}/>
                }
              />
            </Col>
          </Row>
        </Content>
      </StyledContent>
    );
  }
}


const mapStateToProps = state => {
  return {
    genreDetail: state.genre.genreDetail,
    genreDetailLoading: state.genre.genreDetailLoading,
    genreDetailError: state.genre.genreDetailError,
    animeList: state.genre.animeList,
    page: state.genre.animeListPage,
    loading: state.genre.animeListLoading,
    totalAnime: state.genre.totalAnime,
    topAnimeData: state.anime.topAnimeData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGenreById: (id, page, perPage = 6) => dispatch(actions.getGenreDetail(id, page, perPage)),
    getAnimeList: (id, page, perPage = 12) => dispatch(actions.getAnimeListGenre(id, page, perPage)),
    clearAnimeList: () => dispatch(actions.clearAnimeListGenre())
  };
};

const GridWrapper = styled.div`
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 32px;
`;

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`;

const StyledContent = styled(Content)`
  padding-top: 10px;
  background-image: url(${BGImage});
  min-height: 100vh;
`;

const StyledBreadcrumbItem = styled(Breadcrumb.Item)`
  color: black !important;
  &:hover {
    color: #df691a !important;
  }
`;


export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    GenreDetailPage
  )
);