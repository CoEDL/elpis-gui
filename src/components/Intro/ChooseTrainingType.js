import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Grid, Button, Header, Container, Segment, Placeholder } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux'
import { engineList, engineLoad } from 'redux/actions/engineActions';
import { setCurrentStep } from 'redux/actions/sideNavActions'
import Branding from 'components/Shared/Branding';
import urls from 'urls'

const ChooseTrainingType = () => {

    const history = useHistory()
    const dispatch = useDispatch()
    const engine= useSelector(state => state.engine.engine)

    const selectEngine = async (engine_name) => {
        await dispatch(engineLoad({engine_name}))
        await dispatch(setCurrentStep(null))
        history.push(urls.gui.dataset.index)
    }

    return (
        <>
            <Branding />
            <Segment>
                <p>Choose a training type.</p>
                <Grid divided='vertically'>
                    <Grid.Row columns={2}>
                        <Grid.Column>
                            <Button
                                fluid
                                className={"home-button"}
                                onClick={() => selectEngine('kaldi')}>
                                Orthographic
                            </Button>
                        </Grid.Column>
                        <Grid.Column>
                            <Button
                                fluid
                                className={"home-button"}
                                onClick={() => selectEngine('espnet')}>
                                Phonemic
                            </Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </>
    )
}

export default ChooseTrainingType