import React, { Component }  from 'react';
import { Button, Divider, Dropdown, Form, Grid, Header, Icon, List, Message, Segment } from 'semantic-ui-react';
import NewTranscription from './New'
import Branding from 'components/Shared/Branding';
import SideNav from 'components/Shared/SideNav';

class TranscriptionPage extends Component {
    render = () => {
        const { match } = this.props

        let sidebar = true

        if (match.params.options) {
            const params = match.params.options.split('/')
            console.log("params", params)
            if (params.includes('ns')) sidebar = false
        }

        const page = sidebar ? (
            <Grid centered>
                <Grid.Column width={ 4 }>
                    <SideNav />
                </Grid.Column>
                <Grid.Column width={ 12 }>
                    <NewTranscription />
                </Grid.Column>
            </Grid>
            ) : (
            <NewTranscription />
            )

        return (
            <div>
                <Branding />
                <Segment>
                    {page}
                </Segment>
            </div>
        )}
}

export default TranscriptionPage;