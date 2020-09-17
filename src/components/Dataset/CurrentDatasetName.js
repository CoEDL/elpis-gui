import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Message } from 'semantic-ui-react';
import urls from 'urls'

class CurrentDatasetName extends Component {

    render() {
        const { t, currentEngine, name, datasetList, match } = this.props

        const onDashboard = (match.url === urls.gui.dataset.index) ? true : false

        let engines = {"kaldi": "Orthographic (Kaldi)"}

        return (
            <>
                {name &&
                <Message color='olive'>
                    { t('engine.common.currentEngineLabel') + engines[currentEngine ]}
                    <br />
                    { t('dataset.common.currentDatasetLabel') + name }
                </Message>
                }

                {!currentEngine &&
                <Message color='purple'>
                    { t('engine.common.noCurrentEngineLabel') }
                </Message>
                }

                {currentEngine && !name &&
                <Message color='purple'>
                    {onDashboard && datasetList.length === 0 &&
                        t('dataset.common.makeNewOne')
                    }
                    {onDashboard && datasetList.length > 0 &&
                        t('dataset.common.selectOneBelow')
                    }
                    {!onDashboard &&
                        <>
                            <p>{ t('dataset.common.noCurrentDatasetLabel') }</p>
                            <Link to={urls.gui.dataset.index}>
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
        name: state.dataset.name,
        datasetList: state.dataset.datasetList,
        currentEngine: state.engine.engine
    }
}
export default withRouter(
    connect(mapStateToProps)(
        translate('common')(CurrentDatasetName)
    )
)