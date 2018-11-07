import React, { Component } from 'react';
import { Card } from 'antd';
import EditForm from './EditForm';
import PropTypes from 'prop-types';

export class EditProfile extends Component{

  static propTypes = {
    handleUpdate: PropTypes.func.isRequired
  };

  render(){
    return (
      <Card>
        <h3>Edit profile</h3>
        <EditForm handleUpdate={this.props.handleUpdate}/>
      </Card>
    );
  }
}