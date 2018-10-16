import React, { Component } from 'react';
import styled from 'styled-components';
import BGImage from '../assets/images/background_login.jpg';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../store/actions';
import {message} from 'antd';
import ResetForm from '../components/ResetForm/ResetForm';
import {parse} from 'query-string';

class ResetPasswordPage extends Component{

  state = {
    isAuthenticated: false
  };

  componentDidMount(){
    if(this.props.isAuthenticated){
      this.props.history.push('/');
    }
  }

  componentDidUpdate(){
    if (this.props.status === true){
      message.success('Password had been changed: Login now!');
      this.props.history.push('/login');
    }
  }

  handleReset = ({password, passwordConfirm}) => {
    let data = parse(this.props.location.search);
    this.props.reset(password, passwordConfirm, data);
  };

  render() {
    return (
      <StyledDiv>
        <ResetForm handleReset={this.handleReset} />
      </StyledDiv>
    );
  }
}

const mapStateToProps = state => {
  return {
    isProcessing: state.auth.isProcessing,
    isAuthenticated: state.auth.isAuthenticated,
    status: state.auth.status,
    errors: state.auth.errors
  };
};

const mapDispatchToProps = dispatch => {
  return {
    reset: (password, passwordConfirm, data) => dispatch(actions.resetPassword(password, passwordConfirm, data))
  };
};

const StyledDiv = styled.div`
  background-image: linear-gradient( to right bottom, rgba(197,208,199,0.6), rgba(52,52,52,0.6)) , url(${BGImage});
  height: 95vh;
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

ResetPasswordPage.propTypes = {
  reset: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  status: PropTypes.bool,
  errors: PropTypes.array,
  history: PropTypes.object,
  isProcessing: PropTypes.bool
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage));
