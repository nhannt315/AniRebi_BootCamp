import React, { Component } from 'react';
import { Form, Input, Tooltip, Icon, DatePicker, Checkbox, Button } from 'antd';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

const StyledForm = styled.div`
  width: 50vw;
  padding: 2rem 4rem 0 0;
  position: absolute;
  top: 10%;
  left: 27%;
  background-color: white;
  box-shadow: 0 4px 8px 1px;
`;

class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.handleRegister(values);
      }
    });
  };

  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], {force: true});
    }
    callback();
  };


  render() {
    const {getFieldDecorator} = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 8},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      },
    };


    const config = {
      rules: [{type: 'object', required: true, message: 'Please select your birthday!'}],
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    return (
      <StyledForm className="animated bounceInRight">
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            {...formItemLayout}
            label="E-mail"
          >
            {getFieldDecorator('email', {
              rules: [{
                type: 'email', message: 'The input is not valid E-mail!',
              }, {
                required: true, message: 'Please input your E-mail!',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Password"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Input type="password" />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Confirm Password"
          >
            {getFieldDecorator('confirm', {
              rules: [{
                required: true, message: 'Please confirm your password!',
              }, {
                validator: this.compareToFirstPassword,
              }],
            })(
              <Input type="password" onBlur={this.handleConfirmBlur} />
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={(
              <span>
              Nickname&nbsp;
                <Tooltip title="What do you want others to call you?">
                  <Icon type="question-circle-o" />
                </Tooltip>
              </span>
            )}
          >
            {getFieldDecorator('name', {
              rules: [{required: true, message: 'Please input your nickname!', whitespace: true}],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="Birthday"
          >
            {getFieldDecorator('birthDay', config)(
              <DatePicker />
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            {getFieldDecorator('agreement', {
              rules: [{required: true, message: 'You have to agree to this dude!'}],
              valuePropName: 'checked',
            })(
              <Checkbox>I have read the <a href="" style={{color: 'blue'}}>agreement</a></Checkbox>
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" style={{width: '60%'}}>Register</Button>
          </FormItem>
        </Form>
      </StyledForm>
    );
  }
}

RegistrationForm.propTypes = {
  handleRegister: PropTypes.func.isRequired
};

export default Form.create()(RegistrationForm);

