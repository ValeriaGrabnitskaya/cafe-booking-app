import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";
import { NavLink, Link } from 'react-router-dom';

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { connect } from 'react-redux';

import './CafeTable.css';

class CafeTable extends React.PureComponent {

    static propTypes = {
        filteredPlaces: PropTypes.array.isRequired
    };

    state = {
        first: 0
    }

    componentDidUpdate(oldProps) {

        if (oldProps.places !== this.props.places) {
            this.setState({ first: 0 })
        } else {
            let page = parseInt(this.props.match.params.page) - 1;
            this.setState({ first: page > 0 ? parseInt(page + '0') : page });
        }
    }

    actionTemplate(rowData) {
        return <div>
            <NavLink className="btn btn-primary BookBtn" to={'/cafe/' + rowData.mainPlaceInfo.id + '/booking'}>Забронировать</NavLink>
        </div>;
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.history.push('/cafe/' + this.props.placeId + '/booking');
    }

    withRouterTemplate(rowData) {
        return <div>
            <NavLink className="CafeNameLink" to={"/cafe/" + rowData.mainPlaceInfo.id}>{rowData.mainPlaceInfo.name}</NavLink>
        </div>;
    }

    onPage = (e) => {
        this.setState({ first: e.first });
        this.props.history.push("/catalog/" + parseInt(e.page + 1));
    }

    render() {
        return (
            <Fragment>
                {
                    (this.props.filteredPlaces) &&
                    <div className="container-fluid mt-md-5 mt-sm-5 mt-xs-5" style={{ width: "85%" }}>
                        <DataTable className="CatalogTable" value={this.props.filteredPlaces} onPage={this.onPage} first={this.state.first} responsive={true} paginator={true} resizableColumns={true} columnResizeMode="fit" rows={10} rowsPerPageOptions={[5, 10, 20]} emptyMessage={'Нет данных'}>
                            <Column body={this.withRouterTemplate} header="Наименование заведения" style={{ width: '15%', textAlign: 'center' }} />
                            <Column field="mainPlaceInfo.mainPageDescription" header="Описание" style={{ width: '55%', textAlign: 'center' }} />
                            <Column field="mainPlaceInfo.contacts.address" header="Адрес" style={{ width: '15%', textAlign: 'center' }} />
                            <Column field="mainPlaceInfo.operationMode" header="Режим работы" style={{ width: '15%', textAlign: 'center' }} />
                            <Column body={this.actionTemplate} style={{ width: '15%', textAlign: 'center' }} />
                        </DataTable>
                    </div>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        filteredPlaces: state.placesReducer.filteredPlaces,
    };
};

export default connect(mapStateToProps)(withRouter(CafeTable));