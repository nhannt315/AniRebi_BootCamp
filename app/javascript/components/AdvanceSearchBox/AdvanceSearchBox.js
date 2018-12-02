import React, { Component } from 'react';
import { Form, Radio, DatePicker, Checkbox, Button } from 'antd';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const {RangePicker} = DatePicker;

class AdvanceSearchBox extends Component {
  state = {
    status: 'all',
    checkedGenreList: [],
    indeterminate: false,
    createdDate: [],
    createdDateString: []
  };
  onCheckBoxChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
    this.setState({
      checkedGenreList: checkedValues
    });
  };

  onStatusRadioChange = (e) => {
    const status = e.target.value;
    this.setState({status});
  };

  resetAll = () => {
    this.setState({
      status: 'all',
      checkedGenreList: [],
      createdDate: [],
      createdDateString: []
    });
    this.props.submit(
      this.state.createdDateString,
      this.state.checkedGenreList,
      this.state.status,
      true
    );
  };

  submitForm = () => {
    this.props.submit(
      this.state.createdDateString,
      this.state.checkedGenreList,
      this.state.status
    );
  };

  onDateChange = (date, dateString) => {
    console.log(date, dateString);
    this.setState({createdDate: date, createdDateString: dateString});
  };

  render() {
    const {genreList} = this.props;
    return (
      <div>
        <Form layout="horizontal">
          <Form.Item label="Created time">
            <RangePicker
              format="DD-MM-YYYY"
              onChange={this.onDateChange}
              value={this.state.createdDate}
            />
          </Form.Item>
          <Form.Item label="Genre">
            <Checkbox.Group onChange={this.onCheckBoxChange} value={this.state.checkedGenreList}>
              <StyledList>
                {genreList && genreList.map(genre => <Checkbox key={genre.id} value={genre.id}>{genre.name}</Checkbox>)}
              </StyledList>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item label="Status">
            <Radio.Group onChange={this.onStatusRadioChange} value={this.state.status}>
              <Radio value="all">All</Radio>
              <Radio value="ongoing">Ongoing</Radio>
              <Radio value="finished">Finished</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button onClick={this.submitForm} type="primary">Apply</Button>
            <Button onClick={this.resetAll} type="primary" style={{marginLeft: '20px'}}>Reset</Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const StyledList = styled.div`
        margin: 0;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-gap: 32px;
        `;

AdvanceSearchBox.propTypes = {
  genreList: PropTypes.array,
  submit: PropTypes.func
};

export default AdvanceSearchBox;