import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { ResponsiveSankey } from '@nivo/sankey';
import { calculateTickValues } from './NivoUtils';
import urls from 'urls'

class SankeyWordOrder extends Component {

    state = {
        dataError: false,
        dataLoaded: false,
        data: 0,
    }

    fetchData = () => {
        fetch(urls.api.statistics.sankeyWord)
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
                        <ResponsiveSankey
                            data={data.sankey}
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

export default connect(mapStateToProps)(translate('common')(SankeyWordOrder))