import React, { Component } from "react";
import { Layout, Row, Col, List, Card, Carousel, Button, Icon } from "antd";
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
    getTopAnime: PropTypes.func.isRequired,
    getGenresList: PropTypes.func.isRequired,
    getGenreTop: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.recentlyReviewedRef = React.createRef();
    console.log(this.props.getTopAnime);
  }

  handleNextBtnClick = e => {
    this.recentlyReviewedRef.current.next();
  };

  handlePrevBtnClick = e => {
    this.recentlyReviewedRef.current.prev();
  };

  render() {
    return (
      <StyledContent className="HomePageContent">
        <Row>
          <Carousel style={{ width: "100%" }} autoplay={true}>
            <StyledImg src={BannerImage} />
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
                    <CustomList dataSource={dataRecent} />
                    <CustomList dataSource={dataRecent} />
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
                title="Slice of life"
                content={<CustomList dataSource={dataTopGenre} />}
              />
            </Col>
            <Col span={6} offset={1}>
              <CardBox
                title="Ranking"
                content={
                  <List
                    dataSource={dataRank}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={
                            <img
                              style={{ width: "50px", height: "75px" }}
                              src={SmallCoverImage}
                            />
                          }
                          title={item.title}
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

const StyledImg = styled.img`
  width: 100%;
  height: 400px;
  color: white;
  text-align: center;
`;

const StyledContent = styled(Content)`
  background-image: url(${BGImage});
`;

export default HomePage;
