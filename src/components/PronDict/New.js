import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Message } from 'semantic-ui-react';
import Branding from 'components/Shared/Branding';
import SideNav from 'components/Shared/SideNav';
import NewForm from 'components/PronDict/NewForm';


class PronDictNew extends Component {

    componentDidMount() {}

    render() {
        const { t, currentEngine } = this.props;

        let engines = {"kaldi": "Orthographic (Kaldi)", "espnet": "Phonemic (ESPnet)"}

        return (
            <div>
                <Branding />
                <Segment>
                    <Grid centered>
                        <Grid.Column width={ 4 }>
                            <SideNav />
                        </Grid.Column>

                        <Grid.Column width={ 12 }>
                            <Header as='h1' text="true">
                                { t('pronDict.new.title') }
                            </Header>

                            {currentEngine &&
                                <Message color='olive'>
                                    { t('engine.common.currentEngineLabel') + engines[currentEngine] }
                                </Message>
                            }

                            <NewForm />

                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.pronDict.name,
        currentEngine: state.engine.engine
    }
}

export default withRouter(connect(mapStateToProps)(
    translate('common')(PronDictNew))
)
