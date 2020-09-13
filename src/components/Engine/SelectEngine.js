import React, { useEffect } from 'react';
import { Grid, Segment, Header, Button, Dropdown, Divider } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { engineList, engineLoad } from 'redux/actions/engineActions';
import { setCurrentStep } from 'redux/actions/sideNavActions'

const SelectEngine = props => {
    let { t, currentEngine, list, engineList, engineLoad } = props;

    let handleChange = (_event, data) => {
        let engine_name = data.value;
        let postData = { engine_name };
        engineLoad(postData);
    };

    let options = list.map((name, i) => ({key: name, text: name, value: name}));
<<<<<<< HEAD

    return (
        <div>
            <Branding />
            <Segment>
                <Grid centered>
                    <Grid.Column width={ 4 }>
                        <SideNav />
                    </Grid.Column>

                    <Grid.Column width={ 12 }>
                        <Header as='h1'>
                            { t('engine.select.title') }
                        </Header>

                        <CurrentEngineName />

                        {useEffect(engineList)}

                        {(()=>{
                            // If the engines list has not been populated, fetch the list and display a wait message.
                            if (list.length === 0) {
                                return (
                                    <div>Updating engine list...</div>
                                )
                            } else {
                                // Otherwise if list is populated, allow engine selections.
                                return (
                                <div>
                                    <Dropdown
                                        placeholder={currentEngine?currentEngine:"select engine"}
                                        selection
                                        options={options}
                                        onChange={handleChange}/>

                                    <Divider />

                                    <Button
                                        as={Link}
                                        to={(currentEngine==="kaldi") ? urls.gui.pronDict.index : urls.gui.model.index}
                                        disabled={!currentEngine}>
                                            {t('common.nextButton')}
                                    </Button>
                                </div>)
                            }
                        })()}
                        
                    </Grid.Column>
                </Grid>
            </Segment>
        </div>
    );
};
=======

    // If the engines list has not been populated, fetch the list and display a wait message.
    if (list.length === 0) {
        useEffect(engineList); // Alternative to componentDidMount
        return (
            <div>Updating engine list...</div>
        )
    } else {
        // Otherwise if list is populated, allow engine selections.
        return (
            <Dropdown
                placeholder={currentEngine?currentEngine:"select engine"}
                selection
                options={options}
                value={currentEngine}
                onChange={handleChange} />
        )
    }
}
>>>>>>> 4b49fd57a5689f04eb1c0692c8e164210f21a4cf

const mapStateToProps = state => {
    return {
        list: state.engine.engine_list,
        currentEngine: state.engine.engine
    }
}

const mapDispatchToProps = dispatch => ({
    engineList: () => {
        dispatch(engineList())
    },
    engineLoad: postData => {
        dispatch(engineLoad(postData))
            .then(response => {
                // Rebuild the sidenav via set current step
                dispatch(setCurrentStep(null))
            })
            .catch(error => console.log("error", error))
    }
})

export default
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(
        translate('common')(SelectEngine)
    )
