import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Message } from 'semantic-ui-react';
import urls from 'urls'

class CurrentModelName extends Component {

    render() {
        const { t, currentEngine, modelList, datasetName, pronDictName, name, match } = this.props

        const onDashboard = (match.url === urls.gui.model.index) ? true : false

        let engines = {"kaldi": "Orthographic (Kaldi)", "espnet": "Phonemic (ESPnet)"}

        return (
            <>
                {name &&
                <Message color='olive'>
                    { t('engine.common.currentEngineLabel') + engines[currentEngine]}
                    <br />
                    { t('model.common.currentModelLabel') + name }
                    <br />
                    { t('pronDict.common.currentPronDictLabel') + pronDictName }
                    <br />
                    {t('dataset.common.currentDatasetLabel') + datasetName }
                </Message>
                }

                {!currentEngine &&
                <Message color='purple'>
                    { t('engine.common.noCurrentEngineLabel') }
                </Message>
                }

                {currentEngine && !name &&
                <Message color='purple'>
                    {onDashboard && modelList.length === 0 &&
                        t('model.common.makeNewOne')
                    }
                    {onDashboard && modelList.length > 0 &&
                        t('model.common.selectOneBelow')
                    }
                    {!onDashboard &&
                        <>
                            <p>{ t('model.common.currentModelLabel') }</p>
                            <Link to={urls.gui.model.index}>
                                { t('common.chooseOrNewLabel') }
                            </Link>
                        </>
                    }
                </Message>
                }
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.model.name,
        modelList: state.model.modelList,
        datasetName: state.model.datasetName,
        pronDictName: state.model.pronDictName,
        currentEngine: state.engine.engine
    }
}
export default withRouter(
    connect(mapStateToProps)(
        translate('common')(CurrentModelName)
    )
)