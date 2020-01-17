import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import TableRow from './TableRow/TableRow';
import { bookingEvents } from '../events';

class TablePlan extends React.PureComponent {

    static propTypes = {
        tablesInfo: PropTypes.array.isRequired
    };

    state = {
        isLoading: false,
        selectedTable: null
    }

    componentDidMount() {
        bookingEvents.addListener('SearchAvailableTables', this.checkSearchBooking);
        bookingEvents.addListener('GetSelectedTable', this.getSelectedTable);
    }

    componentWillUnmount() {
        bookingEvents.removeListener('SearchAvailableTables', this.checkSearchBooking);
        bookingEvents.removeListener('GetSelectedTable', this.getSelectedTable);
    }

    checkSearchBooking = (isSearchSubmit) => {
        this.setState({ isLoading: isSearchSubmit })
    }

    getSelectedTable = (tableId) => {
        this.setState({ selectedTable: tableId })
    }

    render() {
        let slicedTables = [];
        for (let i = 0; i < this.props.tablesInfo.length; i++) {
            slicedTables.push(this.props.tablesInfo.slice(i, i + 3));
            i += 2;
        }
        return (
            <Fragment>
                {
                    (this.state.isLoading) &&
                    <Fragment>
                        <div className="container">
                            <h4 className="mb-3">План рассадки кафе</h4>
                            <div style={{ border: "1px solid black" }}>
                                {
                                    slicedTables.map((tableGoup, index) => <TableRow key={index} tableGoup={tableGoup} selectedTable={this.state.selectedTable} />)
                                }
                            </div>
                        </div>
                        <p>* для выбора столика необходимо нажать на него</p>
                    </Fragment>
                }
            </Fragment>
        )
    }
}


export default TablePlan;