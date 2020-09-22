import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Grid, Segment, Header, Icon, Button, Tab } from 'semantic-ui-react';
import Branding from 'components/Shared/Branding';
import SideNav from 'components/Shared/SideNav';
import CurrentDatasetName from "./CurrentDatasetName";
import urls from 'urls';
import DatasetOverviewSwarmplot from "components/Visualisations/DatasetOverviewSwarmplot"
import WordFrequencyBar from "components/Visualisations/WordFrequencyBar"

class DatasetVisualiser extends Component {

    handleViewChange = (e) => this.setState({ activeTab: e.target.value })

    handleTabChange = (e, { activeIndex }) => this.setState({ activeTab: activeIndex })
    
    handleNextButton = () => {
        const { history, datasetPrepare} = this.props
        datasetPrepare(history)
        history.push(urls.gui.dataset.prepare)
    }

    render() {

        const { t, additionalTextFiles, status, wordlist } = this.props

        const panes = [
            { menuItem: 'Dataset Overview - Swarmplot', render: () => <Tab.Pane>{<DatasetOverviewSwarmplot/>}</Tab.Pane> },
            { menuItem: 'File List - Custom', render: () => <Tab.Pane>{<WordFrequencyBar/>}</Tab.Pane> },
            { menuItem: 'Word Frequency - Bar', render: () => <Tab.Pane>{<WordFrequencyBar/>}</Tab.Pane> },
            { menuItem: 'Word Order - Sankey', render: () => <Tab.Pane>{<WordFrequencyBar/>}</Tab.Pane> },
        ]

        return (
            <div>
                <Branding />
                <Segment>
                    <Grid centered>
                        <Grid.Column width={4}>
                            <SideNav />
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Header as='h1'>{t('dataset.visualise.title')}</Header>

                            <CurrentDatasetName />

                            {status === 'ready' &&
                                <p>{ t('dataset.prepare.ready') }</p>
                            }
                            {status === 'loaded' &&
                                <p>
                                    <Icon name='circle notched' size="big" loading />
                                    { t('dataset.prepare.preparing') }
                                    <Button onClick={this.handleNextButton}>
                                        { t('common.skipButton') }
                                    </Button>
                                </p>
                            }
                            {status === 'wordlist-prepared' &&
                                <>
                                    <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                                    <Button onClick={this.handleNextButton}>
                                        { t('common.nextButton') }
                                    </Button>
                                </>
                            }
                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        name: state.dataset.name,
        wordlist: state.dataset.wordlist,
        additionalTextFiles: state.dataset.additionalTextFiles,
        status: state.dataset.status
    }
}

export default connect(mapStateToProps)(translate('common')(DatasetVisualiser))