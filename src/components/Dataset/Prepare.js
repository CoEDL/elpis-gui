import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Grid, Header, Segment, Table, Tab } from 'semantic-ui-react';
import { ResponsiveBar } from "@nivo/bar";
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import arraySort from 'array-sort'
import Branding from 'components/Shared/Branding';
import SideNav from 'components/Shared/SideNav';
import CurrentDatasetName from "./CurrentDatasetName";
import urls from 'urls'

class DatasetPrepare extends Component {

    state = {
        column: null,
        reverse: false,
        activeTab: 0
    }

    componentDidMount() {
    }

    handleSort = (clickedColumn, data) => () => {
        const { column } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                reverse: false,
            })
            arraySort(data, clickedColumn, { reverse: false })
        } else {
            this.setState({
                reverse: !this.state.reverse
            })
            arraySort(data, clickedColumn, { reverse: !this.state.reverse })
        }
    }

    handleViewChange = (e) => this.setState({ activeTab: e.target.value })

    handleTabChange = (e, { activeIndex }) => this.setState({ activeTab: activeIndex })

    generateTickValues = (freqlist) => {
        var yValues = freqlist.map(value => value.frequency);
        var max = Math.max(...yValues);
        if (max < 10) {
            return max;
        } else {
            return 10;
        }
    }

    render() {

        const { t, additionalTextFiles, wordlist } = this.props

        const { column, direction } = this.state

        const { activeTab } = this.state

        const interactionDisabled = (this.props.name && wordlist.length > 0) ? false : true

        const wordFreqGraph = (wordlist) =>
            <div style={{ height: 500 }}>
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
                        tickValues: this.generateTickValues(wordlist),
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

        const wordFreqTable = (wordlist) =>
            <Table sortable celled fixed unstackable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            sorted={column === 'name' ? direction : null}
                            onClick={this.handleSort('name', wordlist)}
                        >
                            Word
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={column === 'frequency' ? direction : null}
                            onClick={this.handleSort('frequency', wordlist)}
                        >
                            Frequency
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        wordlist.map(word => {
                            return (
                                <Table.Row key={word.name}>
                                    <Table.Cell>
                                        {word.name}
                                    </Table.Cell>
                                    <Table.Cell>{word.frequency}</Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table>


        const panes = (wordlist) => [
            { menuItem: 'Table', render: () => <Tab.Pane>{wordFreqTable(wordlist)}</Tab.Pane> },
            { menuItem: 'Graph', render: () => <Tab.Pane>{wordFreqGraph(wordlist)}</Tab.Pane> },
        ]

        const listEl = wordlist.length > 0 ? (
            <>
                <Grid>
                    <Grid.Column width={12}>
                        <h2>{t('dataset.prepare.header')}</h2>
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <Button.Group floated='right'>
                            <Button
                                onClick={this.handleViewChange}
                                value={0}
                                active={activeTab === 0}
                            >Table</Button>
                            <Button
                                onClick={this.handleViewChange}
                                value={1}
                                active={activeTab === 1}
                            >Graph</Button>
                        </Button.Group>
                    </Grid.Column>
                </Grid>

                {additionalTextFiles.length > 0 &&
                    <p>{t('dataset.prepare.description')}</p>
                }

                <div>
                <Button.Group>
                    <Button
                        onClick={this.handleSort('name', wordlist)}
                    >Alphbetical</Button>
                    <Button
                        onClick={this.handleSort('frequency', wordlist)}
                    >Frequency</Button>
                </Button.Group>
                </div>

                <Tab
                    activeIndex={activeTab}
                    menu={{ secondary: true, pointing: true }}
                    panes={panes(wordlist)}
                    onTabChange={this.handleTabChange}
                />

            </>

        ) : (
                <p>{t('dataset.prepare.noWords')}</p>
            )

        return (
            <div>
                <Branding />
                <Segment>
                    <Grid centered>
                        <Grid.Column width={4}>
                            <SideNav />
                        </Grid.Column>
                        <Grid.Column width={12}>
                            <Header as='h1'>{t('dataset.prepare.title')}</Header>

                            <CurrentDatasetName />

                            {listEl}

                            <Button as={Link} to={urls.gui.engine.index} disabled={interactionDisabled}>
                                {t('common.nextButton')}
                            </Button>

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
        additionalTextFiles: state.dataset.additionalTextFiles
    }
}

export default connect(mapStateToProps)(translate('common')(DatasetPrepare))
