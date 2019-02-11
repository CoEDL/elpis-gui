import React, { Component } from "react";
import classNames from "classnames";
import Dropzone from "react-dropzone";
import { fromEvent } from "file-selector";
import { translate } from 'react-i18next';
import { updateDataBundleFiles } from 'redux/actions';
import { connect } from 'react-redux';

class FileUpload extends Component {

    onDrop = (acceptedFiles, rejectedFiles) => {
        console.log("files dropped:", acceptedFiles);

        var formData = new FormData();
        // backend will need to know whether to add to existing files
        // or wipe existing and use only these
        // we'll also need to update redux state on this basis
        formData.append('filesOverwrite', this.props.filesOverwrite);
        acceptedFiles.forEach(file => {
            console.log(file)
            formData.append('file', file);
        })
        this.props.updateDataBundleFiles(formData);
    };

    render() {
        const { t } = this.props;

        return (
            <div className="FileUpload">

                <Dropzone className="dropzone" onDrop={ this.onDrop } getDataTransferItems={ evt => fromEvent(evt) }>
                    { ({ getRootProps, getInputProps, isDragActive }) => {
                        return (
                            <div
                                { ...getRootProps() }
                                className={ classNames("dropzone", {
                                    "dropzone_active": isDragActive
                                }) }
                            >
                                <input { ...getInputProps() } />

                                {
                                    isDragActive ? (
                                        <p>{ t('dataBundle.fileUpload.dropFilesHintDragActive') } </p>
                                    ) : (<p>{ t('dataBundle.fileUpload.dropFilesHint') }</p>)
                                }
                            </div>
                        );
                    } }
                </Dropzone>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        filesOverwrite: state.model.filesOverwrite
    }
}

const mapDispatchToProps = dispatch => ({
    updateDataBundleFiles: postData => {
        dispatch(updateDataBundleFiles(postData));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(translate('common')(FileUpload));
