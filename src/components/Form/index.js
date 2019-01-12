import React, {Component,Fragment} from "react";

import {Form,Input,Button} from "antd";
import UploadPicker from "./UploadPicker"

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 14,
      offset: 6,
    },
  },
};
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

class FormView extends Component {
  constructor(props) {
    super(props);
    const {form}=props;
    const {getFieldDecorator}=form;
    this.formConfig = props.formConfig;
    
    this.FormItems = {
      "input": (item) => {
        return (
          <Form.Item label={item.label} {...formItemLayout}>
            {
              getFieldDecorator(item.key,{

              })(<Input />)
            }
          </Form.Item>
        )
      },
      "uploadPicker": (item) => {
        return (
          <Form.Item label={item.label} {...formItemLayout}>
            {
              getFieldDecorator(item.key,{

              })(<UploadPicker />)
            }
          </Form.Item>
        )
      }

    }
    this.state = {}
  }

  getFormItem =(item)=>{
      return this.FormItems[item.type](item)
  }

  onSubmit=(e)=>{
    e.preventDefault();
    const {form:{validateFields}} =this.props;
    const {onFormSubmit}=this.formConfig;
    validateFields((err,values)=>{
      if(err){
        return;
      }
      onFormSubmit&&onFormSubmit(values);        
    });
  }


  onReset = (e) =>{
    e.preventDefault();
    const {form} =this.props;
    form.resetFields();
  }

  render() {
    return (
      <Form layout="horizontal" onSubmit={this.onSubmit} onReset={this.onReset}>
        {
          this.formConfig.formItems.filter(item=>item.type).map(item=>{
            return <Fragment key={`item-${item.key}`}>{ this.getFormItem(item)}</Fragment>
          })
        }
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" size="large" style={{marginRight:15}}>保存</Button>
          <Button type="ghost" htmlType="reset" size="large" >重置</Button>
        </Form.Item>
      </Form>
    )
  }
}


export default  Form.create()(FormView)