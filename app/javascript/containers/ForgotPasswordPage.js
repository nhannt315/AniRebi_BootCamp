import React, { Component } from 'react';
import styled from 'styled-components';
import BGImage from '../assets/images/background_login.jpg';
import ForgotForm from '../components/ForgotForm/index';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../store/actions';
import {message} from 'antd';

class ForgotPasswordPage extends Component {

  state = {
    isAuthenticated: false
  };

  componentDidMount(){
    if(this.props.isAuthenticated){
      this.props.history.push('/');
    }
  }

  componentDidUpdate(){
    const {isProcessing, errors} = this.props;
    if (!isProcessing && this.props.status === true){
      message.success('Check your email for reset password link!');
      this.props.history.push('/');
    }
  }

  handleForgot = ({email}) => {
    this.props.forgot(email,'http://localhost:3000/reset_pwd');
  };

  render() {
    return (
      <StyledDiv>
        <ForgotForm handleForgot={this.handleForgot} />
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
    forgot: (email, redirect) => dispatch(actions.forgotPassword(email, redirect))
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

ForgotPasswordPage.propTypes = {
  forgot: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  errors: PropTypes.array,
  status: PropTypes.bool,
  history: PropTypes.object,
  isProcessing: PropTypes.bool
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordPage));
