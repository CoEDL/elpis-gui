import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Grid, Header, Segment, Icon, Button } from 'semantic-ui-react';
import { translate } from 'react-i18next';
import Branding from 'components/Steps/Shared/Branding';
import Informer from 'components/Steps/Shared/Informer';

class DataBundlePreparationError extends Component {
    render() {
        const { t } = this.props;
        return (
            <div>
                <Branding />
                <Segment>
                    <Grid centered>
                        <Grid.Column width={ 4 }>
                            <Informer />
                        </Grid.Column>

                        <Grid.Column width={ 12 }>
                            <Header as='h1'>
                                <Icon name='warning' />
                                { t('dataBundle.preparationError.title') }
                            </Header>

                            <p>Banner Message: errors were found when cleaning(processing) your data</p>
                            <p>Novice readable description of what just happened</p>
                            <p>Show the errors and information about how to fix the error</p>

                            <Button type='submit' as={ Link } to="/data-bundle/add-files">
                                { t('dataBundle.preparationError.backButton') }
                            </Button>

                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        );
    }
}
export default translate('common')(DataBundlePreparationError)
