import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './CardBox.scss';

class CardBox extends Component {
  static propTypes = {
    title: PropTypes.string,
    content: PropTypes.node.isRequired
  };

  render() {
    const { title, content, staticContext, ...rest } = this.props;
    if (title != null) {
      return (
        <div className="CardBoxContainer" {...rest}>
          <div className="CardBoxTitleContainer">
            <h1 className="CardBoxTitle">{title}</h1>
          </div>
          <div className="CardBoxContent">{content}</div>
        </div>
      );
    } else {
      return (
        <div className="CardBoxContainer">
          <div
            className="CardBoxContent"
            style={{
              borderWidth: '1px 1px 1px 1px',
              borderRadius: '3px 3px 3px 3px'
            }}
          >
            {content}
          </div>
        </div>
      );
    }
  }
}

export default CardBox;
