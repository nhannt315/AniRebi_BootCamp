import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import onClickOutside from 'react-onclickoutside';

import PlaceHolderImg from '../../assets/images/placeholder.png';
import './SearchMenu.scss';

class SearchMenu extends Component {
  handleClickOutside = () => {
    this.props.clearSearchResult();
  };

  onImageError = e => {
    e.target.onerror = null;
    e.target.src = PlaceHolderImg;
  };

  handleImgClick = (animeId) => {
    this.props.history.push('/anime/' + animeId);
  };

  render() {
    const {searchResult, clearSearchResult} = this.props;
    if (!searchResult) {
      return null;
    }
    return (
      <div className="search-menu">
        <ul>
          {
            searchResult.slice(0, 5).map(anime => (
              <li key={anime.id} onClick={()=>this.handleImgClick(anime.id)}>
                <div className="search-li-detail">
                  <img  src={anime.cover_medium} onError={this.onImageError}/>
                  <div className="search-li-info">
                    <div className="search-li-anime">
                      <Link to="/" onClick={clearSearchResult}>
                        {anime.name}
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>
    );
  }
}

SearchMenu.propTypes = {
  searchResult: PropTypes.array,
  clearSearchResult: PropTypes.func,
  history: PropTypes.object
};

export default onClickOutside(SearchMenu);