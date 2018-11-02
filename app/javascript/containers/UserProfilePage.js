import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Breadcrumb, Layout, Row, Card, Col, Icon, Avatar, List} from 'antd';
import * as actions from '../store/actions';
import styled from 'styled-components';
import BGImage from '../assets/images/background_home.png';

const {Content} = Layout;
const { Meta } = Card;

const data = [
  {
    title: 'Review Title 1',
  },
  {
    title: 'Review Title 2',
  },
  {
    title: 'Review Title 3',
  },
  {
    title: 'Review Title 4',
  },
];

class UserProfilePage extends Component{

  componentDidMount(){
    const splits = this.props.history.location.pathname.split('/');
    this.props.getProfileById(splits[2]);
  }

  render(){
    if (!this.props.isFetching && (this.props.errors == null)) {
      const {userData, userInfo} = this.props;
      var actionss = [];
      if (userData.id === userInfo.id) {
        actionss.push(<Icon type="setting" />);
        actionss.push(<Icon type="edit" />);
      }
      return (<StyledContent className="UserProfileContent">
        <Content style={ { padding: '0 50px' } }>
          <StyledBreadcrumb style={{margin: '16px 0'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>User Profile</Breadcrumb.Item>
          </StyledBreadcrumb>
          <Row gutter={ 16 }>
            <Col span={ 6 }>
              <Card
                style={{ width: '100%' }}
                cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
                actions={actionss}>
                <Meta
                  avatar={<StyledAvatar size="large" style={{color: '#f56a00', backgroundColor: '#fde3cf'}}>{userInfo.name.charAt(0).toUpperCase()}</StyledAvatar>}
                  title={userInfo.name}
                  description={userInfo.email} />
              </Card>
            </Col>
            <Col span={18}>
              <Card>
                <h3>Reviewed by me</h3>
                <List
                  itemLayout="horizontal"
                  dataSource={data}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                        title={<a href="#">{item.title}</a>}
                        description="Demo user review content"
                      />
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Content>
      </StyledContent>);
    }
    else {
      return (
        <Card>
          <h1>Can't find any user here</h1>
        </Card>
      );
    }
  }

  static propTypes = {
    isFetching: PropTypes.bool.isRequired,
    userInfo: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    getProfileById: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
    errors: PropTypes.string
  };
}

const mapStateToProps = state => {
  return {
    isFetching: state.user.isFetching,
    userInfo: state.user.userInfo,
    errors: state.user.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfileById: id => dispatch(actions.getProfile(id, true))
  };
};


const StyledContent = styled(Content)`
  padding-top: 10px;
  padding-bottom: 30px;
  min-height: 100vh;
  background-image: url(${BGImage});
`;

const StyledAvatar = styled(Avatar)`
  &:hover{
    cursor: pointer;
  }
`;

const StyledBreadcrumb = styled(Breadcrumb)`
  color: black !important;
  &:hover {
    color: #df691a !important;
  }
  background: #fff;
  padding: 10px 5px;
  border-radius: 2px;
`;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserProfilePage)
);
