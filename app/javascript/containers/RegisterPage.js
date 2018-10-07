import React, { Component } from 'react';
import styled from 'styled-components';

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
  };
  render() {
    return (
      <StyledDiv>
        <RegistrationForm handleRegister={this.handleRegister} />
      </StyledDiv>
    );
  }
}

export default RegisterPage;