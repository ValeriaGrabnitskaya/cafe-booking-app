import React from 'react';
import PropTypes from 'prop-types';

import './TableRow.css';
import { bookingEvents } from '../../events';

class TableRow extends React.PureComponent {

    static propTypes = {
        tableGoup: PropTypes.array.isRequired,
        selectedTable: PropTypes.number
    };

    selectTable = (table) => {
        bookingEvents.emit('GetSelectedTable', table.id);
    }

    render() {
        return (
            <div className="row mb-3 mt-3 ml-3 mr-3">
                {
                    this.props.tableGoup.map((table, index) => {
                        let tableClass = '';
                        let selectedTable = table.id === this.props.selectedTable ? ' SelectedTable' : '';

                        if (table.hasOwnProperty('isAvailable')) {
                            tableClass = table.isAvailable ? 'Available' : 'NotAvailable';
                        }
                        if (index === this.props.tableGoup.length - 1) {
                            return <div key={index} className={'Table ' + tableClass + ' col-md-2 ' + selectedTable} onClick={() => this.selectTable(table)}>{table.name}</div>
                        } else {
                            return <div key={index} className={'Table ' + tableClass + " col-md-2 mr-auto " + selectedTable} onClick={() => this.selectTable(table)}>{table.name}</div>
                        }
                    })
                }
            </div>
        )
    }
}

export default TableRow;