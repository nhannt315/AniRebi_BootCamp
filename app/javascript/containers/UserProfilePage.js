import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {Breadcrumb, Layout, Row, Card, Col, Icon, Avatar, message} from 'antd';
import * as actions from '../store/actions';
import styled from 'styled-components';
import BGImage from '../assets/images/background_home.png';
import { ProfileInfo, EditProfile } from '../components/UserProfile/index';
import CardBox from '../components/CardBox/CardBox'
const { Content } = Layout;
const { Meta } = Card;

class UserProfilePage extends Component{
  
  state = {
    isEdit: false,
    isUpdating: false,
    isAuthenticated: false,
    isUpdated: false
  };

  componentDidMount(){
    const splits = this.props.history.location.pathname.split('/');
    this.props.getProfileById(splits[2]);
  };

  componentDidUpdate(){
    if(this.props.isUpdated === true){
      window.location.reload();
      message.success("User info has been updated!");
    }
  }

  editProfile = () => {
    this.setState({
      isEdit: true
    })
  };

  updateProfileInfo = (name, email) => {
    const splits = this.props.history.location.pathname.split('/');
    this.props.updateProfile(splits[2], name, email);
  }

  showProfile = () => {
    this.setState({
      isEdit: false
    })
  };

  render(){
    if (!this.props.isFetching && (this.props.errors == null)) {
      const {userData, userInfo} = this.props;
      var actionss = [];
      if (userData.id === userInfo.id) {
        //actionss.push(<Icon type="setting" />);
        this.state.isEdit ? actionss.push(<Icon type="profile" onClick={this.showProfile} />)
        : actionss.push(<Icon type="edit" onClick={this.editProfile} />);
      }
      return (<StyledContent className="UserProfileContent">
        <Content style={ { padding: '0 50px' } }>
          <Row>
            <CardBox
              content={
                <Breadcrumb>
                  <StyledBreadcrumbItem href="/">
                    <Icon type="home" /> Home
                  </StyledBreadcrumbItem>
                  <StyledBreadcrumbItem onClick={this.showProfile} style={{cursor: "pointer"}}>
                    <Icon type="bars" style={{cursor: "pointer"}}/> Profile
                  </StyledBreadcrumbItem>
                </Breadcrumb>
              }
            />
          </Row>
          <Row gutter={ 16 } style={{marginTop: '10px'}}>
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
            <Col span={ 18 }>
              {
                this.props.isAuthenticated && this.state.isEdit ? <EditProfile handleUpdate={this.updateProfileInfo}/> : <ProfileInfo dataSource={userInfo.reviews} />
              }
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
    history: PropTypes.object,
    getProfileById: PropTypes.func.isRequired,
    userData: PropTypes.object.isRequired,
    errors: PropTypes.string,
    isUpdated: PropTypes.bool.isRequired,
    isAuthenticated: PropTypes.bool.isRequired
  };
}

const mapStateToProps = state => {
  return {
    isFetching: state.user.isFetching,
    isUpdating: state.user.isUpdating,
    userInfo: state.user.userInfo,
    errors: state.user.errors,
    isUpdated: state.user.updated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getProfileById: id => dispatch(actions.getProfile(id, true)),
    updateProfile: (id, name, email) => dispatch(actions.updateProfile(id, name, email))
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

const StyledBreadcrumbItem = styled(Breadcrumb.Item)`
  color: black !important;
  cursor: pointer;
  &:hover {
    color: #df691a !important;
  }
`;

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(UserProfilePage)
);
