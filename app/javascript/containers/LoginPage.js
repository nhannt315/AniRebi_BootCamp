import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import {message} from 'antd';
import {withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';

import LoginForm from '../components/LoginForm/index';
import BGImage from '../assets/images/background_login.jpg';
import * as actions from '../store/actions';


class LoginPage extends Component {

  state = {
    isAuthenticated: false
  };

  componentDidMount(){
    if(this.props.isAuthenticated){
      this.props.history.push('/');
    }
  }

  componentDidUpdate(){
    if(this.props.isAuthenticated){
      this.props.history.push('/');
    }
    if(this.props.errors.length > 0){
      // const messageContent =
    }
  }


  handleLogin = ({email, password, remember}) => {
    this.props.login(email, password, remember);
  };

  render() {
    return (
      <StyledDiv>
        <LoginForm handleLogin={this.handleLogin} />
      </StyledDiv>
    );
  }
}

const StyledDiv = styled.div`
  background-image: linear-gradient( to right bottom, rgba(197,208,199,0.6), rgba(52,52,52,0.6)) , url(${BGImage});
  height: 95vh;
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    errors: state.auth.errors,
    isProcessing: state.auth.isProcessing
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password, remember) => dispatch(actions.login(email, password, remember))
  };
};

LoginPage.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object,
  errors: PropTypes.array,
  isProcessing: PropTypes.bool
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));