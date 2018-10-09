import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Row, Col, List, Carousel, Button, Icon } from "antd";
import CoverImage from "../assets/images/cover_placeholder.jpg";
import SmallCoverImage from "../assets/images/small_cover_placeholder.jpg";
import BannerImage from "../assets/images/banner_placeholder.jpg";
import styled from "styled-components";
import CardBox from "../components/CardBox/CardBox";
import BGImage from "../assets/images/background_home.png";
import CustomList from "../components/CustomList/CustomList";
import PropTypes from "prop-types";

const { Content } = Layout;

class HomePage extends Component {
  static propTypes = {
    topAnimeData: PropTypes.array.isRequired,
    genresListData: PropTypes.array.isRequired,
    genreTopData: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.recentlyReviewedRef = React.createRef();
  }

  handleNextBtnClick = e => {
    this.recentlyReviewedRef.current.next();
  };

  handlePrevBtnClick = e => {
    this.recentlyReviewedRef.current.prev();
  };

  handleImgError = e => {
    e.target.src = "https://image.ibb.co/djfJJp/placeholder.png";
  };

  handleBannerError = e => {
    e.target.src = "https://image.ibb.co/hnycB9/placeholder_large.png";
  };

  render() {
    const FilteredBannerData = this.props.topAnimeData.filter(
      item => item.banner != null
    );
    const BannerImages = FilteredBannerData.map(item => (
      <StyledImg src={item.banner} onError={this.handleBannerError} />
    ));

    const SlicedTopAnimeData1 = this.props.topAnimeData.slice(0, 7);
    const SlicedTopAnimeData2 = this.props.topAnimeData.slice(7, 15);

    return (
      <StyledContent className="HomePageContent">
        <Row>
          <Carousel style={{ width: "100%" }} autoplay={true}>
            {BannerImages}
          </Carousel>
        </Row>
        &nbsp;
        <Content style={{ padding: "0px 100px 50px" }}>
          <CardBox
            title="Recently Reviewed"
            content={
              <Row type="flex" justify="center" align="middle">
                <Col span={1} style={{ textAlign: "left" }}>
                  <Button
                    size="large"
                    type="primary"
                    shape="circle"
                    onClick={this.handlePrevBtnClick}
                    style={{
                      background: "#df691a",
                      borderColor: "#df691a",
                      borderTopRightRadius: "0",
                      borderBottomRightRadius: "0"
                    }}
                  >
                    <Icon type="left" />
                  </Button>
                </Col>
                <Col span={22}>
                  <Carousel ref={this.recentlyReviewedRef} dots={false}>
                    <CustomList dataSource={SlicedTopAnimeData1} />
                    <CustomList dataSource={SlicedTopAnimeData2} />
                  </Carousel>
                </Col>
                <Col span={1} style={{ textAlign: "right" }}>
                  <Button
                    size="large"
                    type="primary"
                    shape="circle"
                    onClick={this.handleNextBtnClick}
                    style={{
                      background: "#df691a",
                      borderColor: "#df691a",
                      borderTopLeftRadius: "0",
                      borderBottomLeftRadius: "0"
                    }}
                  >
                    <Icon type="right" />
                  </Button>
                </Col>
              </Row>
            }
          />
          &nbsp;
          <Row>
            <Col span={17}>
              <CardBox
                title={this.props.genreTopData.genre.name}
                content={
                  <CustomList dataSource={this.props.genreTopData.animes} />
                }
              />
            </Col>
            <Col span={6} offset={1}>
              <CardBox
                title="Ranking"
                content={
                  <List
                    dataSource={this.props.topAnimeData}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <img
                              style={{
                                width: "50px",
                                height: "75px",
                                borderColor: "white",
                                borderWidth: "2px 2px 2px 2px",
                                borderStyle: "solid",
                                borderRadius: "2px 2px 2px 2px",
                                boxShadow:
                                  "0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 5px 0 rgba(0, 0, 0, 0.19)"
                              }}
                              src={item.cover_large}
                              onError={this.handleImgError}
                            />
                          }
                          title={<strong>{item.name}</strong>}
                          description={
                            <span>
                              <span className="">
                                <Icon type="message" theme="twoTone" />
                                &nbsp;10,000
                              </span>
                              &nbsp; &nbsp;
                              <span className="">
                                <StyledIcon type="star" theme="filled" />
                                &nbsp;5.0
                              </span>
                            </span>
                          }
                        />
                      </List.Item>
                    )}
                  />
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
    topAnimeData: state.anime.topAnimeData,
    genresListData: state.anime.genresListData,
    genreTopData: state.anime.genreTopData
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

const StyledImg = styled.img`
  width: 100%;
  height: 440px;
  color: white;
  text-align: center;
`;

const StyledContent = styled(Content)`
  background-image: url(${BGImage});
`;

const StyledIcon = styled(Icon)`
  color: yellow;
`;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HomePage)
);
