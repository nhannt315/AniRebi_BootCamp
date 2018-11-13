import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Tag, Icon, Button} from 'antd';
import PropTypes from 'prop-types';

import LazyLoadImage from '../../../components/LazyLoadImage';
import './AnimeItem.scss';

class AnimeItem extends Component {
  handleImgError = e => {
    e.target.src = 'https://image.ibb.co/djfJJp/placeholder.png';
  };
  render() {
    const {anime, confirmDelete} = this.props;
    return (
      <div className="item">
        <div className="box-cover">
          <Link to={`/anime/${anime.id}`}>
            <LazyLoadImage
              className="anime-image"
              src={anime.cover_medium}
              placeholder="https://is4-ssl.mzstatic.com/image/thumb/Purple62/v4/c8/5b/a0/c85ba051-99e7-3bd5-29dc-c0a246334207/source/512x512bb.jpg"
              onError={this.handleImgError}
            />
          </Link>
        </div>
        <div className="box-description">
          <p>{anime.name}</p>
          <p><b>Japanese title</b> : <span>{anime.title_native}</span></p>
          <div><b>Genres</b> : {
            anime.genres.map(genre => <Tag key={genre.id}>{genre.name}</Tag>)
          }</div>
          <p><b>Status</b> : <span>{anime.status}</span></p>
        </div>
        <div style={{float: 'right', position: 'absolute', right: '10px', top: '10px'}}>
          <Button type="danger" onClick={() => confirmDelete(anime.id)}>
            <Icon type="delete" />
          </Button>
        </div>
      </div>
    );
  }
}

AnimeItem.propTypes = {
  anime: PropTypes.object,
  confirmDelete: PropTypes.func
};

export default AnimeItem;
