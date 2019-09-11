import React, { Component } from 'react';
import { Button, Grid, Header, Segment, Table } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { pronDictList, pronDictLoad } from 'redux/actions';
import arraySort from 'array-sort'
import Branding from 'components/Steps/Shared/Branding';
import Informer from 'components/Steps/Shared/Informer';
import CurrentPronDictName from "./CurrentPronDictName";

class PronDictDashboard extends Component {

    state = {
        column: null,
        reverse: false
    }

    componentDidMount() {
        this.props.pronDictList()
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

    handleLoad = name => {
        const { pronDictLoad } = this.props
        const postData = { name: name }
        pronDictLoad(postData)
    }

    render() {
        const { t, name, list } = this.props;
        console.log("this.props.list", list)
        console.log("this.props.name", name)
        const { column, direction } = this.state
        const listEl = list.length > 0 ? (
            <Table sortable celled fixed unstackable>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell
                            sorted={ column === 'name' ? direction : null }
                            onClick={ this.handleSort('name', list) }
                        >
                            Name
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {
                    list.map( pronDictName => {
                        console.log(pronDictName, ":", name)
                        const className = (pronDictName === name) ? 'current-data-bundle' : ''
                        return (
                            <Table.Row key={ pronDictName } className={ className }>
                                <Table.Cell>
                                    <Button fluid onClick={ () => this.handleLoad(pronDictName) }>{ pronDictName }</Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })
                }
                </Table.Body>
            </Table>
        ) : <p>{ t('pronDict.dashboard.noneMessage') }</p>

        return (
            <div>
                <Branding />
                <Segment>
                    <Grid centered>
                        <Grid.Column width={ 4 }>
                            <Informer />
                        </Grid.Column>

                        <Grid.Column width={ 12 }>
                            <Header as='h1'>
                                { t('pronDict.dashboard.title') }
                            </Header>

                            <CurrentPronDictName />

                            <Segment>
                                { listEl }
                            </Segment>

                        </Grid.Column>
                    </Grid>
                </Segment>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        list: state.pronDict.pronDictList,
        name: state.pronDict.name
    }
}

const mapDispatchToProps = dispatch => ({
    pronDictList: () => {
        dispatch(pronDictList())
    },
    pronDictLoad: postData => {
        dispatch(pronDictLoad(postData))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(translate('common')(PronDictDashboard))
