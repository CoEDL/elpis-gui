import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Grid, Button, Header, Container, Segment, Placeholder } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { modelList } from 'redux/actions/modelActions';
import { interfaceObjectNames } from 'redux/actions/configActions';
import Branding from 'components/Shared/Branding';
import urls from 'urls'

class StepWelcome extends Component {

    componentDidMount() {
    	const postData = {selected_engine: "kaldi"}
        this.props.modelList(postData)
    }

	render() {
		const { t, list } = this.props
		console.log(list)
		const existing_sessions = true
		return (
			<>
				<Branding />

				<Segment className="welcome-content">

					<p className="leader">What is Elpis?</p>
					<p>
						Elpis brings cutting-edge speech recognition technology within reach of language workers and researchers who may not have backgrounds in speech engineering. With Elpis, we hope to enable more people to be able to use speech recognition tools to obtain transcriptions for speech.
					</p>
					<p>
						Orthographic and phonemic transcriptions can be made with Elpis. Each type has particular requirements around what is needed to use Elpis.
					</p>
					<p>
						For phonemic training, you will require some phonemically transcribed audio.
					</p>
					<p>
						Orthographic training requires audio with word level transcriptions, plus a "letter to sound" file which maps the characters in the orthography to pronunciation symbols.
					</p>
					<p>
						For guidance using Elpis, including more information about the requirements, follow the <a href="https://elpis.readthedocs.io/en/latest/wiki/elpis-workshop.html" target="_blank">Elpis workshop steps</a>.
					</p>

					<Grid divided='vertically'>
						<Grid.Row columns={2}>
							<Grid.Column>
								<Button
									fluid
									className={"home-button"}
									as={Link}
									to={urls.gui.intro.choose_engine}>
									Train
								</Button>
							</Grid.Column>
							<Grid.Column>
								{list && list.length > 0 &&
									<Button
										fluid
										className={"home-button"}
										as={Link}
										to={urls.gui.transcription.no_sidebar}>
										Transcribe
									</Button>
								}
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Segment>
			</>
		);
	}
}

const mapStateToProps = state => {
    return {
        list: state.model.modelList,
    }
}
const mapDispatchToProps = dispatch => ({
    modelList: postData => {
        dispatch(modelList(postData))
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(translate('common')(StepWelcome))
