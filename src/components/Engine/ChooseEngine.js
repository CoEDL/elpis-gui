import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import { translate } from 'react-i18next';
import { Grid, Button } from 'semantic-ui-react';
import { engineList, engineLoad } from 'redux/actions/engineActions';
import { setCurrentStep } from 'redux/actions/sideNavActions'
import urls from 'urls'

const ChooseEngine = props => {

    const history = useHistory()
    const dispatch = useDispatch()
    const engine= useSelector(state => state.engine.engine)

    const selectEngine = async (engine_name) => {
        await dispatch(engineLoad({engine_name}))
        await dispatch(setCurrentStep(null))
        history.push(urls.gui.dataset.index)
    }

    let { t } = props;

    return (
        <>
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
        </>

    )
}

export default translate('common')(ChooseEngine)
