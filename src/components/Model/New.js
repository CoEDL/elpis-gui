import React, { Component } from 'react';
import { Grid, Header, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Message } from 'semantic-ui-react';
import Branding from 'components/Shared/Branding';
import SideNav from 'components/Shared/SideNav';
import NewForm from 'components/Model/NewForm';
import engines from "engines"


class ModelNew extends Component {

    render() {
        const { t, currentEngine } = this.props;

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
                                { t('model.new.title') }
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
        currentEngine: state.engine.engine
    }
}


export default connect(mapStateToProps)(
    translate('common')(ModelNew)
)
