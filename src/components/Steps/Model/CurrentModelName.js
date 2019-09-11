import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Message } from 'semantic-ui-react';
import urls from 'urls'

class CurrentModelName extends Component {

    render() {
        const { t, dataBundleName, pronDictName, name, match } = this.props

        const link = (match.url !== urls.gui.model.index) ? (
            <>
            &nbsp;
            <Link to={urls.gui.model.index}>
                { t('common.chooseOrNewLabel') }
            </Link>
            </>
        ) : (
            <>&nbsp; { t('common.selectOneBelow') }</>
        )

        const current = name ?
        (
            <Message color='olive'>
                    {t('dataBundle.common.currentDataBundleLabel') + dataBundleName}
                    <br />
                    {t('pronDict.common.currentPronDictLabel') + pronDictName}
                    <br />
                { t('model.common.currentModelLabel') + name }
            </Message>
        ) : (
            <Message negative>
                { t('model.common.noCurrentModelLabel') }
                { link }
            </Message>
        )

        return (
            <>{ current }</>
        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.model.name,
        dataBundleName: state.model.dataBundleName,
        pronDictName: state.model.pronDictName
    }
}
export default withRouter(
    connect(mapStateToProps)(
        translate('common')(CurrentModelName)
    )
)