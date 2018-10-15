import { Icon, List } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styled from 'styled-components';
import './CustomVerticalList.scss';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

class CustomVerticalList extends Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    history: PropTypes.object,
    getAnimeById: PropTypes.func.isRequired
  };

  handleImgError = e => {
    e.target.src = 'https://image.ibb.co/djfJJp/placeholder.png';
  };

  handleClick = id => {
    this.props.history.push('/anime/' + id);
    this.props.getAnimeById(id);
  };

  render() {
    const { dataSource } = this.props;

    return (
      <List
        dataSource={dataSource}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <img
                  className="VerticalListItemCover"
                  src={item.cover_large}
                  onError={this.handleImgError}
                  onClick={() => this.handleClick(item.id)}
                />
              }
              title={
                <span
                  className="VerticalListItemTitle"
                  onClick={() => this.handleClick(item.id)}
                >
                  {item.name}
                </span>
              }
              description={
                <span>
                  <span className="VerticalListItemNumberOfReviews">
                    <Icon type="message" theme="twoTone" />
                    &nbsp;10,000
                  </span>
                  &nbsp; &nbsp;
                  <span className="VerticalListItemScore">
                    <StyledIcon type="star" theme="filled" />
                    &nbsp;5.0
                  </span>
                </span>
              }
            />
          </List.Item>
        )}
      />
    );
  }
}

const StyledIcon = styled(Icon)`
  color: yellow;
`;

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    getAnimeById: id => dispatch(actions.getAnimeById(id))
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(CustomVerticalList)
);
