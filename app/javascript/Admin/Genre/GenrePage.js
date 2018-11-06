import React, { Component } from 'react';
import { Table, Spin, Divider } from 'antd';
import axios from '../../axios_anime';

import './GenrePage.scss';

class GenrePage extends Component {

  state = {
    genreList: null,
    loading: false
  };

  deleteRow = (text, record) => {
    console.log(record);
  }
  columns = [{
    title: 'ID',
    dataIndex: 'id',
    key: 'id'
  }, {
    title: 'Name',
    dataIndex: 'name',
    key: 'name'
  }, {
    title: 'Total anime',
    dataIndex: 'total_anime',
    key: 'total_anime'
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">Invite {record.name}</a>
        <Divider type="vertical" />
        <a href="javascript:;" onClick={() => this.deleteRow(text, record)}>Delete</a>
      </span>
    ),
  }];


  getGenreList = () => {
    axios.get('http://localhost:3000/api/v1/genres/')
      .then(response => {
        this.setState({genreList: response.data, loading: false});
      })
      .catch(error => {

      });
  };


  componentDidMount() {
    this.setState({loading: true});
    setTimeout(this.getGenreList, 1000);
  }

  render() {
    const content = this.state.loading ? (
      <div className="loadingWrapper">
        <Spin/>
      </div>
    ) : (
      <div>
        <Table columns={this.columns} dataSource={this.state.genreList}>

        </Table>
      </div>
    );
    return content;
  }
}

export default GenrePage;