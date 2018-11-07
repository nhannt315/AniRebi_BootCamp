import React, { Component } from 'react';
import { Select, Modal, Form, Input, Radio } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

class AnimeForm extends Component {
  render() {
    const { visible, onCancel, onCreate, form, genreList } = this.props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText="Create"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="Title">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input the title of collection!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Japanese title">
            {getFieldDecorator('jptitle', {
              rules: [{ required: true, message: 'Please input the japanese title of collection!' }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem label="Description">
            {getFieldDecorator('description')( <Input.TextArea rows={4} />)}
          </FormItem>
          <FormItem label="Genres">
            {getFieldDecorator('genres')(
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Please select"
                defaultValue={['a10', 'c12']}
              >
                {genreList.map(genre => <Select.Option key={genre.id}>{genre.name}</Select.Option>)}
              </Select>
            )}
          </FormItem>
          <FormItem className="collection-create-form_last-form-item" label="Status">
            {getFieldDecorator('status', {
              initialValue: 'ongoing',
            })(
              <Radio.Group>
                <Radio value="ongoing">On going</Radio>
                <Radio value="finsihed">Finished</Radio>
              </Radio.Group>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

AnimeForm.propTypes = {};

export default Form.create()(AnimeForm);