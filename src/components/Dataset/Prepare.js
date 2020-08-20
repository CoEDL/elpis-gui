import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { Button, Grid, Header, Icon, Segment, Table } from 'semantic-ui-react';
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
        reverse: false
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
                reverse: ! this.state.reverse
            })
            arraySort(data, clickedColumn, { reverse: ! this.state.reverse })
        }
    }

    render() {
        const { t, additionalTextFiles, status, wordlist } = this.props

        const { column, direction } = this.state

        const interactionDisabled = (this.props.name && wordlist.length > 0) ? false : true

        const listEl = wordlist.length > 0 ? (
            <>
            <h2>{ t('dataset.prepare.header') }</h2>

            { additionalTextFiles.length > 0 &&
                <p>{ t('dataset.prepare.description') }</p>
            }

            <Table sortable celled fixed unstackable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            sorted={ column === 'name' ? direction : null }
                                onClick={this.handleSort('name', wordlist) }
                        >
                            Word
                        </Table.HeaderCell>
                        <Table.HeaderCell
                            sorted={ column === 'frequency' ? direction : null }
                                onClick={this.handleSort('frequency', wordlist) }
                        >
                            Frequency
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        wordlist.map(word => {
                            return (
                                <Table.Row key={ word.name }>
                                    <Table.Cell>
                                        { word.name }
                                    </Table.Cell>
                                    <Table.Cell>{ word.frequency }</Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table>
            </>
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
                            <Header as='h1'>{ t('dataset.prepare.title') }</Header>

                            <CurrentDatasetName />

                            {status === 'ready' &&
                                <p>{ t('dataset.prepare.ready') }</p>
                            }
                            {status === 'loaded' &&
                                <p>
                                <Icon name='circle notched' size="big" loading />
                                { t('dataset.prepare.preparing') }
                                </p>
                            }
                            {status === 'wordlist-prepared' &&
                                <>
                                    {listEl}

                                    <Button as={Link} to={urls.gui.engine.index} disabled={interactionDisabled}>
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

export default connect(mapStateToProps)(translate('common')(DatasetPrepare))
