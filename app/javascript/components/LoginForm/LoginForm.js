import React, { Component } from 'react';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import './LoginForm.scss';

const FormItem = Form.Item;

const DivForm = styled.div`
  width: 400px;
  box-shadow: 0 4px 8px 1px;
  padding: 1rem;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  position: absolute;
`;

class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleLogin(values);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;

    return (
      <DivForm>
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{required: true, message: 'Please input your email!'}],
            })(
              <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>} type="email" placeholder="Email"/>
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{required: true, message: 'Please input your Password!'}],
            })(
              <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>} type="password"
                     placeholder="Password"/>
            )}
          </FormItem>
          <FormItem style={{display: 'block', textAlign: 'center'}}>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: false,
            })(
              <Checkbox style={{float: 'left'}}>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="" style={{float: 'right'}}>Forgot password</a>

            <Button type="primary" htmlType="submit" style={{width: '100%'}}>
              Log in
            </Button>
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
      </DivForm>
    );
  }
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  form: PropTypes.object
};

export default Form.create()(LoginForm);