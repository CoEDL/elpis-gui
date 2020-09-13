import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Divider, Grid, Header, Message, Segment, Tab } from 'semantic-ui-react';
import { ResponsiveBar } from '@nivo/bar'
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import classNames from "classnames";
import Dropzone from "react-dropzone";
import { fromEvent } from "file-selector";
import { pronDictL2S } from 'redux/actions/pronDictActions';
import Branding from 'components/Shared/Branding';
import SideNav from 'components/Shared/SideNav';
import CurrentPronDictName from "./CurrentPronDictName";
import urls from 'urls'

class PronDictL2S extends Component {

    state = {
        activeTab: 0,
        l2sFreqDataError: false,
        l2sFreqDataLoaded: false,
        l2sFreqData: 0,
    }

    handleViewChange = (e) => this.setState({ activeTab: e.target.value })

    handleTabChange = (e, { activeIndex }) => this.setState({ activeTab: activeIndex })

    onDrop = (acceptedFiles, rejectedFiles) => {
        console.log("files dropped:", acceptedFiles);
        const { pronDictL2S } = this.props
        var formData = new FormData();
        formData.append('file', acceptedFiles[0]);
        pronDictL2S(formData);
    }

    generateTickValues = (graphList) => {
        var yValues = Object.values(graphList)
        var max = Math.max(...yValues);
        if (max < 10) {
            return max;
        } else {
            return 10;
        }
    }

    convertToBarData = (data) => {
        var newData = []
        Object.keys(data).map(function(key, index) {
            newData.push({
                "grapheme" : key,
                "frequency" : data[key]
            })
        });
        return newData
    }

    fetchL2sData = () => {
        fetch(urls.api.statistics.l2sFreq)
            .then(res => res.json())
            .then(
                (res) => {
                    this.setState({
                        l2sFreqDataLoaded: true,
                        l2sFreqData: res.data
                    })
                },
                (error) => {
                    this.setState({
                        l2sFreqDataLoaded: true,
                        l2sFreqDataError: error
                    })
                }
            )
    }

    render() {
        const { t, l2s, name } = this.props;

        const interactionDisabled = name ? false : true

        const rawL2s = 
        <pre>
            { l2s }
        </pre>

        const { 
            activeTab, 
            l2sFreqDataError,
            l2sFreqDataLoaded,
            l2sFreqData, 
        } = this.state;

        const l2sFreqGraph = l2s ? (
            l2sFreqDataError ? (
                <div>Error Loading Data: {l2sFreqDataError.message}</div>
            ) : (
                !l2sFreqDataLoaded ? (
                    this.fetchL2sData
                    (<div>Loading Data...</div>)
                ) : (
                    <div style={{ height: 500 }}>
                        <ResponsiveBar
                            data={this.convertToBarData(l2sFreqData)}
                            keys={["frequency"]}
                            indexBy="grapheme"
                            colors={"#D3A0F0"}
                            colorBy="index"
                            gridYValues={[1, 2, 3]}
                            axisBottom={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: -45,
                                legend: 'Grapheme',
                                legendPosition: 'middle',
                                legendOffset: 50
                            }}
                            axisLeft={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                tickValues: 5,
                                legend: 'Frequency',
                                legendPosition: 'middle',
                                legendOffset: -40
                            }}
                            margin={{
                                "top": 50,
                                "right": 50,
                                "bottom": 80,
                                "left": 60
                            }}
                        />
                    </div>
                )
            )
        ) : null
        
        const panes = [
            { menuItem: 'File', render: () => <Tab.Pane>{rawL2s}</Tab.Pane> },
            { menuItem: 'Graph', render: () => <Tab.Pane>{l2sFreqGraph}</Tab.Pane> },
        ]

        const pron = l2s ? (
            <Tab
                activeIndex={activeTab}
                menu={{ secondary: true, pointing: true }}
                panes={panes}
                onTabChange={this.handleTabChange}
            />
        ) : null

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
                                { t('pronDict.l2s.title') }
                            </Header>

                            <CurrentPronDictName />

                            <Message content={ t('pronDict.l2s.description') } />

                            { ! pron &&
                                <Segment>
                                    <Dropzone
                                        disabled={interactionDisabled}
                                        className="dropzone"
                                        onDrop={ this.onDrop }
                                        getDataTransferItems={ evt => fromEvent(evt) }>
                                        { ({ getRootProps, getInputProps, isDragActive }) => {
                                            return (
                                                <div
                                                    { ...getRootProps() }
                                                    className={ classNames("dropzone", {
                                                        "dropzone_active": isDragActive
                                                    }) }
                                                >
                                                    <input { ...getInputProps() } />

                                                    {
                                                        isDragActive ? (
                                                            <p>{ t('pronDict.l2s.dropFilesHintDragActive') } </p>
                                                        ) : (<p>{ t('pronDict.l2s.dropFilesHint') }</p>)
                                                    }
                                                    <Button>{t('pronDict.l2s.uploadButton')}</Button>
                                                </div>
                                            );
                                        } }
                                    </Dropzone>
                                </Segment>
                            }

                            <Button as={Link} to={urls.gui.pronDict.lexicon} disabled={interactionDisabled}>
                                {t('common.nextButton')}
                            </Button>

                            {pron &&
                                <Segment>
                                    { pron }
                                </Segment>
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
        l2s: state.pronDict.l2s,
        name: state.pronDict.name,
    }
}

const mapDispatchToProps = dispatch => ({
    pronDictL2S: postData => {
        dispatch(pronDictL2S(postData));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(translate('common')(PronDictL2S));
