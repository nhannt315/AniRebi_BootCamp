import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Avatar, List } from 'antd';
import PropTypes from 'prop-types';

export class ProfileInfo extends Component{

  static propTypes = {
    dataSource: PropTypes.array.isRequired
  };

  handleImgError = e => {
    if(e && e.target)
      e.target.src = 'https://image.ibb.co/djfJJp/placeholder.png';
  };

  render(){
    return (
      <Card>
        <h3>Reviewed by me</h3>
        <List
          itemLayout="horizontal"
          dataSource={this.props.dataSource}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={item.anime.cover.url} onError={this.handleImgError} />}
                title={<Link to={`/anime/${item.review.anime_id}`}>{item.review.title}</Link>}
                description={item.review.content}
              />
            </List.Item>
          )}
        />
      </Card>
    );
  }
}
