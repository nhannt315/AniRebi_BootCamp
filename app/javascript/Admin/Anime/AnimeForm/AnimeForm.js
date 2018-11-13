import React, { Component } from 'react';
import { Select, Modal, Form, Input, Radio, Upload, Button, Icon } from 'antd';
import PropTypes from 'prop-types';

const FormItem = Form.Item;

class AnimeForm extends Component {
  state = {
    fileListCover: [],
    fileListBanner: [],
    animeDetail: {},
    isEdit: false
  };


  uploadFile = (file) => {
    console.log(file);
  };

  closeModal = () => {
    this.setState({fileListCover: [], fileListBanner: []}, () => this.props.onCancel());
  };

  render() {
    const {isEdit, visible, onCreate, form, genreList, fileListCover, fileListBanner, handleChangeCover, handleChangeBanner} = this.props;

    const {getFieldDecorator} = form;
    return (
      <Modal
        visible={visible}
        title="Create a new collection"
        okText={isEdit ? 'Update' : 'Create'}
        onCancel={this.closeModal}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="Title">
            {getFieldDecorator('title', {
              rules: [{required: true, message: 'Please input the title!'}]
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem label="Japanese title">
            {getFieldDecorator('jptitle', {
              rules: [{required: true, message: 'Please input the japanese title!'}],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem label="Description">
            {getFieldDecorator('description', {
              rules: [{required: true, message: 'Please input the description!'}],
            })(
              <Input.TextArea rows={4}/>
            )}
          </FormItem>
          <FormItem label="Genres">
            {getFieldDecorator('genres', {
              rules: [{required: true, message: 'Please select the genres!'}],
            })(
              <Select
                mode="multiple"
                style={{width: '100%'}}
                placeholder="Please select"
              >
                {genreList.map(genre => <Select.Option key={genre.id} value={genre.id}>{genre.name}</Select.Option>)}
              </Select>
            )}
          </FormItem>
          <FormItem
            label="Cover"
          >
            {getFieldDecorator('cover', {
              rules: [{required: true, message: 'Please select the cover image!'}],
            })(
              <Upload
                name="uploadFile"
                data={this.uploadFile}
                listType="picture-card"
                beforeUpload={() => false}
                fileList={fileListCover}
                onChange={handleChangeCover}
              >
                {fileListCover.length > 0 ? null : (
                  <Button>
                    <Icon type="upload"/> Click to Select
                  </Button>
                )}
              </Upload>
            )}
          </FormItem>
          <FormItem
            label="Banner"
          >
            {getFieldDecorator('banner', {
              rules: [{required: true, message: 'Please select the banner image!'}],
            })(
              <Upload
                name="uploadFile"
                data={this.uploadFile}
                beforeUpload={() => false}
                listType="picture-card"
                fileList={fileListBanner}
                onChange={handleChangeBanner}
              >
                {fileListBanner.length > 0 ? null : (
                  <Button>
                    <Icon type="upload"/> Click to Select
                  </Button>
                )}
              </Upload>
            )}
          </FormItem>
          <FormItem className="collection-create-form_last-form-item" label="Status">
            {getFieldDecorator('status', {
              initialValue: 'ONGOING',
              rules: [{required: true, message: 'Please select the status!'}]
            },)(
              <Radio.Group>
                <Radio value="ONGOING">On going</Radio>
                <Radio value="FINISHED">Finished</Radio>
              </Radio.Group>
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
}

AnimeForm.propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
  onCreate: PropTypes.func,
  form: PropTypes.object,
  genreList: PropTypes.array,
  isEdit: PropTypes.bool,
  anime: PropTypes.object,
  fileListCover: PropTypes.array,
  fileListBanner: PropTypes.array,
  handleChangeCover: PropTypes.func,
  handleChangeBanner: PropTypes.func,
  imageChange: PropTypes.func
};

export default Form.create()(AnimeForm);