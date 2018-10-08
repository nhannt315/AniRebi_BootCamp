import React, { Component } from 'react';
import { Layout, Row, Col, List, Card, Carousel, Button, Icon } from 'antd';
import CoverImage from '../assets/images/cover_placeholder.jpg';
import SmallCoverImage from '../assets/images/small_cover_placeholder.jpg';
import BannerImage from '../assets/images/banner_placeholder.jpg';
import styled from 'styled-components';

const { Content } = Layout;

class HomePage extends Component {
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

  render() {
    const dataRecent = [
      { title: 'Title 1' },
      { title: 'Title 2' },
      { title: 'Title 3' },
      { title: 'Title 4' },
      { title: 'Title 5' },
      { title: 'Title 6' },
      { title: 'Title 7' },
      { title: 'Title 8' }
    ];

    const dataRank = [
      { title: 'Title 1' },
      { title: 'Title 2' },
      { title: 'Title 3' }
    ];

    return (
      <Content className="HomePageContent" style={{ padding: '10px 50px' }}>
        <Row>
          <Carousel autoplay={true}>
            <Banner src={BannerImage} />
            <Banner src={BannerImage} />
            <Banner src={BannerImage} />
            <Banner src={BannerImage} />
          </Carousel>
        </Row>
        &nbsp;
        <Row>
          <Col span={24}>
            <h1>Recently Reviewed</h1>
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
          <Col span={1} style={{ textAlign: 'left' }}>
            <Button
              type="primary"
              shape="circle"
              onClick={this.handlePrevBtnClick}
            >
              <Icon type="left" />
            </Button>
          </Col>
          <Col span={22}>
            <Carousel ref={this.recentlyReviewedRef} dots={false}>
              <List
                grid={{ gutter: 8, column: 8 }}
                itemLayout="horizontal"
                dataSource={dataRecent}
                renderItem={item => (
                  <List.Item>
                    <Card
                      style={{ width: '135px' }}
                      hoverable
                      cover={<img src={CoverImage} alt="cover" />}
                    >
                      <Card.Meta title={item.title} />
                    </Card>
                  </List.Item>
                )}
              />

              <List
                grid={{ gutter: 8, column: 8 }}
                dataSource={dataRecent}
                itemLayout="horizontal"
                renderItem={item => (
                  <List.Item>
                    <Card
                      style={{ width: '135px' }}
                      hoverable
                      cover={<img src={CoverImage} alt="cover" />}
                    >
                      <Card.Meta title={item.title} />
                    </Card>
                  </List.Item>
                )}
              />
            </Carousel>
          </Col>
          <Col span={1} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              shape="circle"
              onClick={this.handleNextBtnClick}
            >
              <Icon type="right" />
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={15}>
            <h1>Romance </h1>
            <Card>
              <List
                grid={{ gutter: 8, column: 4 }}
                dataSource={dataRecent}
                itemLayout="horizontal"
                renderItem={item => (
                  <List.Item>
                    <Card
                      style={{ width: '135px' }}
                      hoverable
                      cover={<img src={CoverImage} alt="cover" />}
                    >
                      <Card.Meta title={item.title} />
                    </Card>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={6} offset={3}>
            <h1>On-air Ranking</h1>
            <Card>
              <List
                dataSource={dataRank}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <img
                          style={{ width: '50px', height: '75px' }}
                          src={SmallCoverImage}
                        />
                      }
                      title={item.title}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Content>
    );
  }
}

const Banner = styled.img`
  width: 100%;
  height: 400px;
  background: gray;
  color: white;
  text-align: center;
`;

export default HomePage;
