import React, { Component } from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import * as actions from '../store/actions';
import BGImage from '../assets/images/background_register.jpg';
import RegistrationForm from '../components/RegisterForm';

const StyledDiv = styled.div`
  background-image: linear-gradient( to right bottom, rgba(147,158,149,0.6), rgba(52,52,52,0.6)) , url(${BGImage});
  height: 95vh;
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

class RegisterPage extends Component {
  handleRegister = values => {
    console.log(values);
    console.log(values.birthDay.format('YYYY-MM-DD'));
    this.props.signUp(values.name, values.email, values.password, values.birthDay);
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
  }

  render() {
    return (
      <StyledDiv>
        <RegistrationForm handleRegister={this.handleRegister} />
      </StyledDiv>
    );
  }
}

RegisterPage.propTypes = {
  isAuthenticated: PropTypes.bool,
  history: PropTypes.object,
  signUp: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signUp: (name, email, password, birthDay) => dispatch(actions.signUp(email, name, password, birthDay))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegisterPage));