import React from "react";
import PicturesWall from "../PickerWall";
import FilePicker from "./FilePicker";


export default class UploadPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            picturesWallIds: [],
            filePicker: []
        }
    }


    onChange() {
        const { picturesWallIds, filePicker } = this.state;
        this.props.onChange(filePicker.concat(picturesWallIds));
    }

    onUploadChange() {

    }

    render() {
        return (
            <div className="uploadPickerContainer">
                <PicturesWall onUploadChange={this.onUploadChange}></PicturesWall>
                <FilePicker onChange={this.onChange}></FilePicker>
            </div>
        )
    }

}