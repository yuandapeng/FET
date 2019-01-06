import React, {Compoonent,Fragment} from "react";

import {Form,Input} from "antd";
@Form.create()
export default class FormView extends Compoonent {
  constructor(props) {
    super(props);
    const {form}=props;
    const {getFieldDecorator}=form;
    this.formConfig = props.formConfig;
    this.FormItems = {
      "input": (item) => {
        return (
          <Form.Item lable={item.label}>
            {
              getFieldDecorator(item.key,{

              })(<Input />)
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

  render() {



    return (
      <Form>
        {
          this.formConfig.filter(item=>item.type).map(item=>{
            return <Fragment>{ this.getFormItem(item)}</Fragment>
          })

        }
      </Form>
    )
  }
}
