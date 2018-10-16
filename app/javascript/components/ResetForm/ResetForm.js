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

class ResetForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleReset(values);
      }
    });
  };

  render() {
    const {getFieldDecorator} = this.props.form;
    return (
      <DivForm className="animated bounceInLeft">
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{required: true, message: 'Please input your new password!'}],
            })(
              <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('passwordConfirm', {
              rules: [{required: true, message: 'Please input your email!'}],
            })(
              <Input prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}} />} type="password" placeholder="Confirm password" />
            )}
          </FormItem>
          <FormItem style={{display: 'block', textAlign: 'center'}}>
            <Button type="primary" htmlType="submit" style={{width: '100%'}}>
              Reset
            </Button>
          </FormItem>
        </Form>
      </DivForm>
    );
  }
}

ResetForm.propTypes = {
  handleReset: PropTypes.func.isRequired,
  form: PropTypes.object
};

export default Form.create()(ResetForm);
