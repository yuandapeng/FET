import React from "react";
import {} from "antd";

export default  class FilePicker extends React.Component{

  constructor(props){
    super(props);
    this.state={
       value:props.value ||[]   
    }

  }


  componentWillReceiveProps(nextProps){
     if(nextProps.value != this.props.value){
        this.setState({value:nextProps.value})
     }
  }





 render(){

    return (
        <div className="filePickerContaier">



        </div>
    )

 }


}