import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Header, Segment, Form, Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { updateModelName } from 'redux/actions';
import Branding from 'components/Steps/Shared/Branding';
import Informer from 'components/Steps/Shared/Informer';

class ModelNew extends Component {

    handleChangeModelName = (event) => {
        // TODO check for errors in the naming process
        const { updateModelName } = this.props;
        updateModelName({ name: event.target.value });
        // TODO goto next step
        // TODO verify on the go if this is a valid name or not
        // TODO enable/disable depending on the above comment.
        // TODO Debounce.
    }

    render() {
        const { t, modelName } = this.props;
        return (
            <div>
                <Branding />
                <Segment>
                    <Grid centered>
                        <Grid.Column width={ 4 }>
                            <Informer />
                        </Grid.Column>

                        <Grid.Column width={ 12 }>
                            <Header as='h1' text="true">
                                { t('naming.title') }
                            </Header>

                            <Form>
                                <Form.Field>
                                    <input
                                        placeholder='Project Name'
                                        onChange={ this.handleChangeModelName }
                                        value={ modelName }
                                    />
                                    {/* {modelList.indexOf(modelName) > -1 ? (<Label basic color='red' pointing>
                                        Model name already exists
                                    </Label>):(<div/>)} */}
                                </Form.Field>

                                <Button type='submit' as={ Link } to="/add-data" >
                                    { t('naming.next-button') }
                                </Button>

                                {/* <Button type='submit' as={Link} to="/add-data" disabled={modelList.indexOf(modelName) > -1 || modelName===""}>GO</Button> */ }

                            </Form>

                            {/* <Divider /> */ }

                            {/* {modelList} */ }

                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        modelName: state.model.name
    }
}
const mapDispatchToProps = dispatch => ({
    updateModelName: name => {
        dispatch(updateModelName(name))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(translate('common')(ModelNew));