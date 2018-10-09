import React, { Component } from "react";
import styled from "styled-components";
import "./CardBox.scss";

import PropTypes from "prop-types";

class CardBox extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.node.isRequired
  };

  render() {
    const { title, content } = this.props;
    return (
      <div className="CardBoxContainer">
        <div className="CardBoxTitleContainer">
          <h1 className="CardBoxTitle">{title}</h1>
        </div>
        <div className="CardBoxContent">{content}</div>
      </div>
    );
  }
}

export default CardBox;
