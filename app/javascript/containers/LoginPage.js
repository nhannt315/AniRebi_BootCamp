import React, { Component } from 'react';
import styled from 'styled-components';

import LoginForm from '../components/LoginForm/index';
import BGImage from '../assets/images/background_login.jpg';

const StyledDiv = styled.div`
  background-image: linear-gradient( to right bottom, rgba(197,208,199,0.6), rgba(52,52,52,0.6)) , url(${BGImage});
  height: 95vh;
  position: relative;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

class LoginPage extends Component {
  handleLogin = (values) => {
    console.log(values);
  };
  render() {
    return (
      <StyledDiv>
        <LoginForm handleLogin={this.handleLogin} />
      </StyledDiv>
    );
  }
}

export default LoginPage;