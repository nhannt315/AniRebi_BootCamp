import React, { Component } from 'react';
import { Form, Icon, Input, Button } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

const DivForm = styled.div`
  width: 400px;
  box-shadow: 0 4px 8px 1px;
  padding: 1rem;
  top: 20%;
  left: 35%;
  background-color: white;
  position: absolute;
`;

class ForgotForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleForgot(values);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <DivForm className="animated bounceInLeft">
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('email', {
              rules: [{required: true, message: 'Please input your email!'}],
            })(
              <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}} />} type="email" placeholder="Type your email for reset password !" />
            )}
          </FormItem>
          <FormItem style={{display: 'block', textAlign: 'center'}}>
            <Button type="primary" htmlType="submit" style={{width: '100%'}}>
              Send
            </Button>
          </FormItem>
        </Form>
      </DivForm>
    );
  }
}

ForgotForm.propTypes = {
  handleForgot: PropTypes.func.isRequired,
  form: PropTypes.object
};

export default Form.create()(ForgotForm);
