import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Tag} from 'antd';
import PropTypes from 'prop-types';

import LazyLoadImage from '../LazyLoadImage';
import './AnimeItem.scss';

class AnimeItem extends Component {
  handleImgError = e => {
    e.target.src = 'https://image.ibb.co/djfJJp/placeholder.png';
  };
  render() {
    const {anime} = this.props;
    return (
      <div className="item">
        <div className="box-cover">
          <Link to={`/anime/${anime.id}`}>
            <LazyLoadImage
              className="anime-image"
              src={anime.cover_medium.url}
              placeholder="https://is4-ssl.mzstatic.com/image/thumb/Purple62/v4/c8/5b/a0/c85ba051-99e7-3bd5-29dc-c0a246334207/source/512x512bb.jpg"
              onError={this.handleImgError}
            />
          </Link>
        </div>
        <div className="box-description">
          <p>{anime.name}</p>
          <p><b>Japanese title</b> : <span>{anime.title_native}</span></p>
          <p><b>Genres</b> : {
            anime.genres.map(genre => <Tag key={genre.id}>{genre.name}</Tag>)
          }</p>
          <p><b>Status</b> : <span>{anime.status}</span></p>
        </div>
      </div>
    );
  }
}

AnimeItem.propTypes = {
  anime: PropTypes.object
};

export default AnimeItem;
