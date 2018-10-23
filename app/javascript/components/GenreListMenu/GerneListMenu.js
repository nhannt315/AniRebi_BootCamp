import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';

import './GerneListMenu.scss';

class GenreListMenu extends Component {
  handleClickOutside = () => {
    this.props.hideList();
  };

  render() {
    const {show, genreList} = this.props;
    return (
      <div className={(show ? 'show' : 'hide') + ' genre-list-wrapper'}>
        <div className="genre-list">
          {genreList.map(genre => (
            <Link
              className="genre-list-link"
              key={genre.id}
              to={`/genre/${genre.id}`}
              onClick={this.props.hideList}
            >
              {genre.name}
            </Link>)
          )}
        </div>
      </div>
    );
  }
}

GenreListMenu.propTypes = {
  show: PropTypes.bool,
  genreList: PropTypes.array,
  hideList: PropTypes.func
};

export default onClickOutside(GenreListMenu);