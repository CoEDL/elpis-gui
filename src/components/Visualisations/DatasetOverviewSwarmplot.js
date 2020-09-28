import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { ResponsiveSwarmPlot } from '@nivo/swarmplot'
import { calculateTickValues } from './NivoUtils';
import urls from 'urls'

class DatasetOverviewSwarmplot extends Component {

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
                    var tickValues = calculateTickValues(
                        Math.min(...res.data.swarmplot.map(node => node.length)), 
                        Math.max(...res.data.swarmplot.map(node => node.length)), 
                        8);
                    this.setState({
                        dataLoaded: true,
                        data: res.data,
                        tickValues: tickValues,
                        min: Math.min(...tickValues),
                        max: Math.max(...tickValues)
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
            tickValues,
            min,
            max
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
                        <ResponsiveSwarmPlot
                            data={data.swarmplot}
                            value = "length"
                            identity = "file"
                            label="file"
                            groups={["Files"]}
                            size={data.size}
                            colors={"#D3A0F0"}
                            spacing={5}
                            enableGridY={true}
                            enableGridX={false}
                            valueScale={{ 
                                type: 'linear', 
                                min: min,
                                max: max
                            }}
                            gridYValues={tickValues}
                            axisBottom={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: -45,
                                legend: 'Word Count',
                                legendPosition: 'middle',
                                legendOffset: 50
                            }}
                            axisLeft={{
                                tickSize: 5,
                                tickPadding: 5,
                                tickRotation: 0,
                                tickValues: tickValues,
                                legend: 'Audio Length (seconds)',
                                legendPosition: 'middle',
                                legendOffset: -40
                            }}
                            axisRight={null}
                            axisTop={null}
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

export default connect(mapStateToProps)(translate('common')(DatasetOverviewSwarmplot))