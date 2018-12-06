import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  Breadcrumb,
  Col,
  Icon,
  Layout,
  Row,
  Spin,
  Popover,
  Button,
  Select
} from 'antd';
import * as actions from '../store/actions';
import styled from 'styled-components';
import BGImage from '../assets/images/background_home.png';
import CardBox from '../components/CardBox';
import CustomVerticalList from '../components/CustomVerticalList';
import CustomCard from '../components/CustomCard/CustomCard';
import AdvanceSearchBox from '../components/AdvanceSearchBox';

const { Content } = Layout;
const Option = Select.Option;

class SearchPage extends Component {
  state = {
    advanceVisible: false,
    conditions: {
      createdDate: [],
      order: 'rating',
      sort: 'desc'
    }
  };

  hideAdvanceSearch = () => {
    this.setState({ advanceVisible: false });
  };

  handleVisibileChange = visible => {
    this.setState({ advanceVisible: visible });
  };

  componentWillUnmount() {
    this.props.clearSearchResult();
    this.props.clearConditions();
  }

  handleOrderSelectChange = value => {
    const {createdDate, genreList, status, sort} = this.state.conditions;
    this.searchAdvance(createdDate, genreList, status, value, sort);
    this.setState(prevState => {
      return {
        ...prevState,
        conditions: {
          ...prevState.conditions,
          order: value
        }
      };
    });
  };

  handleSortSelectChange = value => {
    const {createdDate, genreList, status, order} = this.state.conditions;
    this.searchAdvance(createdDate, genreList, status, order, value);
    this.setState(prevState => {
      return {
        ...prevState,
        conditions: {
          ...prevState.conditions,
          sort: value
        }
      };
    });
  };

  handleAdvanceSearch = (createdDate, genreList, status, reset = false) => {
    console.log(createdDate, genreList, status);
    this.setState(prevState => ({
      ...prevState,
      conditions: {
        ...prevState.conditions,
        createdDate,
        genreList,
        status
      }
    }));
    this.searchAdvance(createdDate, genreList, status, this.state.conditions.order, this.state.conditions.sort, reset);
  };

  searchAdvance = (createdDate, genreList, status, order, sort, isClear = false) => {
    this.props.setSearchConditions({createdDate, genreList, status, order, sort});
    if (!isClear) {
      this.hideAdvanceSearch();
      this.props.searchAnime({
        q: this.props.keyword,
        page: 1,
        itemPerPage: 20,
        conditions: { createdDate, genreList, status, order, sort }
      });
    }else{
      this.props.clearConditions();
    }
  }

  render() {
    const {
      topAnimeData,
      keyword,
      searchResult,
      isFetching,
      genresListData
    } = this.props;
    let resultBox = null;
    if (isFetching) {
      resultBox = (
        <div>
          <Spin />
        </div>
      );
    } else {
      resultBox = (
        <StyledList>
          {searchResult.length > 0 &&
            searchResult.map(anime => (
              <CustomCard
                style={{ margin: '0 4px 5px 4px' }}
                id={anime.id}
                key={anime.id}
                title={anime.name}
                cover={anime.cover_large}
                ratingNo={anime.reviews_count}
                score={anime.rating}
              />
            ))}
        </StyledList>
      );
    }
    return (
      <StyledContent>
        <Content style={{ padding: '0px 100px 50px' }}>
          <Row>
            <Col span={17}>
              <CardBox
                content={
                  <div>
                    <Breadcrumb style={{ float: 'left' }}>
                      <StyledBreadcrumbItem href="/">
                        <Icon type="home" /> Home
                      </StyledBreadcrumbItem>
                      <StyledBreadcrumbItem href="/anime">
                        <Icon type="bars" /> Anime
                      </StyledBreadcrumbItem>
                      <StyledBreadcrumbItem href="">
                        Search with keyword : {keyword}
                      </StyledBreadcrumbItem>
                    </Breadcrumb>
                    <Popover
                      content={
                        <AdvanceSearchBox
                          genreList={genresListData}
                          submit={this.handleAdvanceSearch}
                        />
                      }
                      trigger="click"
                      placement="left"
                      visible={this.state.advanceVisible}
                      onVisibleChange={this.handleVisibileChange}
                    >
                      <Button style={{ float: 'right' }}>
                        <Icon type="search" />
                        <span>Search Advance</span>
                      </Button>
                    </Popover>
                    <span style={{ clear: 'both', display: 'block' }} />
                  </div>
                }
              />
              &nbsp;
              <CardBox
                content={
                  <React.Fragment>
                    <div style={{marginBottom: '10px'}}>
                      {'Filter : '}
                      <Select
                        value={this.state.conditions.order}
                        onChange={this.handleOrderSelectChange}
                        style={{ width: 100 }}
                      >
                        <Option value="rating">Rate</Option>
                        <Option value="time">Created date</Option>
                      </Select>
                      &nbsp;
                      <Select
                        value={this.state.conditions.sort}
                        onChange={this.handleSortSelectChange}
                        style={{ width: 100 }}
                      >
                        <Option value="desc">Desc</Option>
                        <Option value="asc">Asc</Option>
                      </Select>
                    </div>
                    {resultBox}
                  </React.Fragment>
                }
              />
            </Col>
            <Col span={6} offset={1}>
              <CardBox
                title="Ranking"
                content={<CustomVerticalList dataSource={topAnimeData} />}
              />
            </Col>
          </Row>
        </Content>
      </StyledContent>
    );
  }
}

SearchPage.propTypes = {
  topAnimeData: PropTypes.array,
  keyword: PropTypes.string,
  clearSearchResult: PropTypes.func,
  searchAnime: PropTypes.func,
  isFetching: PropTypes.bool,
  searchResult: PropTypes.array,
  genresListData: PropTypes.array,
  setSearchConditions: PropTypes.func,
  clearConditions: PropTypes.func
};

const mapStateToProps = state => {
  return {
    topAnimeData: state.anime.topAnimeData,
    keyword: state.search.keyword,
    isFetching: state.search.isFetching,
    searchResult: state.search.searchResult,
    genresListData: state.anime.genresListData
  };
};

const mapDispatchToProps = dispatch => {
  return {
    searchAnime: payload => dispatch(actions.searchAnime(payload)),
    clearSearchResult: () => dispatch(actions.clearSearchResult()),
    setSearchConditions: conditions =>
      dispatch(actions.setSearchAdvanceConditions({ conditions })),
    clearConditions: () => dispatch(actions.clearSearchConditions())
  };
};

const StyledList = styled.div`
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 32px;
`;

const StyledContent = styled(Content)`
  padding-top: 10px;
  background-image: url(${BGImage});
  min-height: 95vh;
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
  )(SearchPage)
);
