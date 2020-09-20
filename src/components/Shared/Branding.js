import React, { Component } from 'react';
import { Button, Confirm, Image, Segment } from 'semantic-ui-react';
import { Link } from "react-router-dom";
import elpisLogo from './elpis.png'
import { connect } from 'react-redux';
import { configReset } from 'redux/actions/configActions';
import SelectEngine from 'components/Engine/SelectEngine'

class StepBranding extends Component {
    state = { open: false }
    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    reset = () => {
        this.props.configReset()
        window.location.href = "/engine/"
    }

    render() {
        const { currentEngine } = this.props

        let engines = {"kaldi": "Orthographic (Kaldi)", "espnet": "Phonemic (ESPnet)"}

        return (
            <Segment clearing as='h1' className="top-nav">
                <Link to="/">
                    <Image floated="left" src={elpisLogo} className="logo" alt="logo" />
                </Link>
                <div className={"right"}>
                    {/*<SelectEngine />*/}
                    <div className="current-engine">{engines[currentEngine]}</div>
                    <Button basic onClick={this.open}>Reset</Button>
                    <Confirm
                      open={this.state.open}
                      content='Resetting will remove the uploaded files and any progress you have made. It will also deselect the engine.'
                      onCancel={this.close}
                      onConfirm={this.reset}
                    />

                </div>
            </Segment>
        )
    }
}

const mapStateToProps = state => {
    return {
        currentEngine: state.engine.engine
    }
}

const mapDispatchToProps = dispatch => ({
    configReset: postData => {
        dispatch(configReset(postData))
            .then(response => console.log("reset OK", response))
            .catch(error => console.log("reset failed", error))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StepBranding)
