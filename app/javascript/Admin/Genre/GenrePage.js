import React, { Component } from 'react';
import { Table, Spin, Divider, Pagination, Button, Modal, Form, Input, message } from 'antd';
import axios from '../../axios_anime';

import './GenrePage.scss';


class GenrePage extends Component {

  state = {
    genreList: null,
    listLoading: false,
    total: 0,
    page: 1,
    perPage: 5,
    keyword: '',
    modalConfig: {
      mode: 'new',
      title: 'Add new genre',
      genreName: '',
      genreId: '',
      visible: false,
      loading: false
    }
  };

  createNewGenre = () => {
    const body = {
      name: this.state.modalConfig.genreName
    };
    axios.post('/api/v1/genres/', body)
      .then(response => {
        this.setState(prevState => ({modalConfig: {...prevState.modalConfig, visible: false, loading: false}}));
        message.success('Created genre successfully!');
        this.getGenreList();
      })
      .catch(error => {
        this.setState(prevState => ({modalConfig: {...prevState.modalConfig, visible: false, loading: false}}));
        message.error('Something went wrong...');
        console.log(error);
      });
  };

  deleteGenre = (id) => {
    axios.delete(`/api/v1/genres/${id}`)
      .then(response => {
        message.success('Deleted successfully!');
        this.getGenreList();
      })
      .catch(error => {
        message.error('Something went wrong!');
      });
  };

  editGenre = (record) => {
    this.setState({
      modalConfig: {
        mode: 'edit',
        title: 'Edit genre',
        genreName: record.name,
        genreId: record.id,
        visible: true
      }
    });
  };

  deleteRow = (text, record) => {
    Modal.confirm({
      title: 'Warning!',
      content: 'Do you want to delete this genre?',
      onOk : () => {
        this.deleteGenre(record.id);
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };
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
        <Button size="small" type="primary" onClick={() => this.editGenre(record)}>Edit</Button>
        <Divider type="vertical"/>
        <Button size="small" type="danger" onClick={() => this.deleteRow(text, record)}>Delete</Button>
      </span>
    ),
  }];

  onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    this.setState({page: 1, perPage: pageSize}, () => this.getGenreList());
  };

  onPageChange = (current, pageSize) => {
    console.log(current, pageSize);
    this.setState({page: current, perPage: pageSize}, () => this.getGenreList());
  };

  updateGenre = () => {

  };

  getGenreList = (keyword = '') => {
    this.setState({listLoading: true, keyword: keyword});
    axios.get(`http://localhost:3000/api/v1/genres?page=${this.state.page}&item_per_page=${this.state.perPage}&keyword=${keyword}`)
      .then(response => {
        response.data.genres.map(obj => obj.key = obj.id);
        this.setState({genreList: response.data.genres, listLoading: false, total: response.data.total});
      })
      .catch(error => {

      });
  };

  addNewGenre = () => {
    this.setState(
      {modalConfig: {mode: 'new', visible: true, title: 'Add new genre'}}
    );
  };

  handleOkModal = () => {
    if(this.state.modalConfig.mode === 'new'){
      this.createNewGenre();
    }else {
      this.updateGenre();
    }
  };



  onInputChange = (e) => {
    const value = e.target.value;
    this.setState({modalConfig: {...this.state.modalConfig, genreName: value}});
  };

  filterGenre = (e) => {
    this.setState({keyword: e.target.value});
    this.getGenreList(e.target.value);
  };


  componentDidMount() {
    this.getGenreList();
  }

  render() {
    const content = this.state.listLoading ? (
      <div className="loadingWrapper">
        <Spin/>
      </div>
    ) : (
      <div>

        <Table columns={this.columns} dataSource={this.state.genreList} pagination={false}/>
        <Pagination
          style={{margin: '16px 0', float: 'right'}}
          showSizeChanger onShowSizeChange={this.onShowSizeChange}
          defaultCurrent={this.state.page}
          total={this.state.total}
          pageSize={this.state.perPage}
          pageSizeOptions={['5', '10', '15']}
          onChange={this.onPageChange}
          size="small"
        />
      </div>
    );
    const {title, visible, loading, genreName} = this.state.modalConfig;
    return (
      <React.Fragment>
        <Modal
          title={title}
          visible={visible}
          confirmLoading={loading}
          onCancel={() => this.setState({modalConfig: {visible: false}})}
          onOk={this.handleOkModal}
        >
          <Form>
            <Form.Item label="Genre name">
              <Input value={genreName} onChange={this.onInputChange}/>
            </Form.Item>
          </Form>
        </Modal>
        <div style={{margin: '0 8px 16px 0'}}>
          <Button onClick={this.addNewGenre}>Add new genre</Button>
          <Input.Search
            placeholder="Search for genres"
            onSearch={value => this.getGenreList(value)}
            value={this.state.keyword}
            onChange={this.filterGenre}
            style={{ width: 200, float: 'right' }}
          />
        </div>
        {content}
      </React.Fragment>
    );
  }
}

export default GenrePage;