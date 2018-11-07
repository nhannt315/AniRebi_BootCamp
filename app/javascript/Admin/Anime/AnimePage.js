import React, { Component } from 'react';
import axios from '../axios_admin';
import { Button, Spin, Input, Pagination } from 'antd';

import AnimeItem from '../../components/AnimeItemHorizontal';
import AnimeForm from './AnimeForm';

import './AnimePage.scss';

class AnimePage extends Component {

  state = {
    animeList: [],
    genreList: [],
    page: 1,
    perPage: 5,
    total: 0,
    currentAnime: null,
    listLoading: false,
    keyword: '',
    modalVisible: false,
  };

  showModal = () => {
    this.setState({modalVisible: true});
  };

  handleCancel = () => {
    this.setState({ modalVisible: false });
  };

  handleCreate = () => {
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ modalVisible: false });
    });
  };

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  getGenreList = () => {
    axios.get(`http://localhost:3000/api/v1/genres?page=1&item_per_page=40`)
      .then(response => {
        response.data.genres.map(obj => obj.key = obj.id);
        this.setState({genreList: response.data.genres});
      })
      .catch(error => {

      });
  };

  getAnimeList = (keyword = '') => {
    const {page, perPage} = this.state;
    this.setState({keyword: keyword, listLoading: true});
    axios.get(`/api/v1/animes?page=${page}&item_per_page=${perPage}&keyword=${keyword}`)
      .then(response => {
        const {total, animes} = response.data;
        this.setState({listLoading: false, animeList: animes, total: total});
      })
      .catch(error => {
        console.log(error);
      });

  };

  componentDidMount() {
    this.getGenreList();
    this.getAnimeList();
  }

  onShowSizeChange = (current, pageSize) => {
    console.log(current, pageSize);
    this.setState({page: 1, perPage: pageSize}, () => this.getAnimeList());
  };

  onPageChange = (current, pageSize) => {
    console.log(current, pageSize);
    this.setState({page: current, perPage: pageSize}, () => this.getAnimeList());
  };

  filterAnime = (e) => {
    this.setState({keyword: e.target.value});
    this.getAnimeList(e.target.value);
  };

  render() {
    const content = this.state.listLoading ? <Spin /> : (
      <div className="list-wrapper">
        {this.state.animeList.map(anime =>
          <AnimeItem key={anime.id} anime={anime} />
        )}
      </div>
    );
    return (
      <div>
        <div style={{margin: '0 8px 16px 0'}}>
          <Button onClick={this.showModal}>Add new anime</Button>
          <AnimeForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.modalVisible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
            genreList={this.state.genreList}
          />
          <Input.Search
            placeholder="Search for anime"
            onSearch={value => this.getAnimeList(value)}
            value={this.state.keyword}
            onChange={this.filterAnime}
            style={{ width: 200, float: 'right' }}
          />
        </div>
        {content}
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
  }
}


export default AnimePage;