import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { ResponsiveBar } from '@nivo/bar';
import { calculateTickValues } from './NivoUtils';
import urls from 'urls'

class WordFrequencyBar extends Component {

    state = {
        activeTab: 0,
        dataError: false,
        dataLoaded: false,
        data: 0,
    }

    fetchData = () => {
        fetch(urls.api.statistics.swarmplot)
            .then(res => res.json())
            .then(
                (res) => {
                    this.setState({
                        dataLoaded: true,
                        data: res.data
                    })
                },
                (error) => {
                    this.setState({
                        dataLoaded: true,
                        dataError: error
                    })
                }
            )
    }
    
    render() {

        const { 
            t, 
            additionalTextFiles, 
            status, 
            wordlist 
        } = this.props

        const {
            activeTab,
            dataError,
            dataLoaded,
            data,
        } = this.state;

        const plot =
            dataError ? (
                <div>Error Loading Data: {dataError.message}</div>
            ) : (
                !dataLoaded ? (
                    this.fetchData
                    (<div>Loading Data...</div>)
                ) : (
                    (<div style={{ height: 500 }}>
                        <ResponsiveBar
                            data={wordlist}
                            keys={["frequency"]}
                            indexBy="name"
                            colors={"#D3A0F0"}
                            colorBy="index"
                            gridYValues={[1, 2, 3]}
                            axisBottom={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: -45,
                                legend: 'Word',
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
                    </div>)
                )
            )

            return (
            <div>
                { plot }
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

export default connect(mapStateToProps)(translate('common')(WordFrequencyBar))