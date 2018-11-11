import { Row } from 'antd';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CustomCard from '../CustomCard/CustomCard';
import './CustomHorizontalList.scss';

class CustomHorizontalList extends Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired
  };

  render() {
    const { dataSource } = this.props;

    const content = dataSource.map(item => (
      <CustomCard
        id={item.id}
        key={item.id}
        title={item.name}
        cover={item.cover_large}
        ratingNo={item.reviews_count}
        score={item.rating}
      />
    ));

    return (
      <div className="CustomHorizontalList">
        <Row type="flex" justify="space-around" style={{ flexWrap: 'nowrap' }}>
          {content}
        </Row>
      </div>
    );
  }
}

export default CustomHorizontalList;
