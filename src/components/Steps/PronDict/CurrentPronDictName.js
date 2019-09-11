import React, { Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Message } from 'semantic-ui-react';
import urls from 'urls'

class CurrentPronDictName extends Component {

    render() {
        const { t, dataBundleName, name, match } = this.props

        const link = (match.url !== urls.gui.pronDict.index) ? (
            <>
            &nbsp;
            <Link to={urls.gui.pronDict.index}>
                { t('common.chooseOrNewLabel') }
            </Link>
            </>
        ) : (
            <>&nbsp; { t('common.selectOneBelow') }</>
        )

        const current = name ?
        (
            <Message color='olive'>
                {t('pronDict.common.currentPronDictLabel') + name }
                <br />
                {t('dataBundle.common.currentDataBundleLabel') + dataBundleName }
            </Message>
        ) : (
            <Message negative>
                { t('pronDict.common.noCurrentPronDictLabel') }
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
        name: state.pronDict.name,
        dataBundleName: state.pronDict.dataBundleName
    }
}
export default withRouter(
    connect(mapStateToProps)(
      translate('common')(CurrentPronDictName)
    )
)