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

				<Segment>

					<h2>What is Elpis?</h2>
					<p>
					Elpis is a speech-to-text transcription tool built with the purpose of accelerating the documentation of ‘low-resource’ languages. The development of Elpis is based on linguists and language workers with no computational experience as its target users. It allows these users to take language recordings, build their own speech recognition system (ASR), and produce text-based orthographic and phonemic transcriptions.
					</p>

					<h2>What is an Automatic Speech Recognition System (ASR)?</h2>
					<p>
					The ASR systems that are built in Elpis are composed of language information including the sounds and words in a language, the ways those words are pronounced, and the probabilities of phone and word sequences.
					</p>

					<h2>First things first</h2>
					<p>
					Building your own ASR System works in stages. Each stage requires language information input and produces an output. In the end, you have a system that can transcribe based on the system you’ve made.
					</p>
					<p>
					The orthographic and phonemic transcription services that Elpis offers require different sources of language information to build its ASR system.
					</p>


					<Grid divided='vertically'>
						<Grid.Row columns={2}>
							<Grid.Column>
								<Button
									fluid
									className={"home-button"}
									as={Link}
									to={urls.gui.intro.choose_training_type}>
									Train
								</Button>
							</Grid.Column>
							<Grid.Column>
								{list && list.length > 0 &&
									<Button
										fluid
										className={"home-button"}
										as={Link}
										to={urls.gui.transcription.new}>
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
