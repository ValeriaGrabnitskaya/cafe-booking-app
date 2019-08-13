import React, { Fragment } from 'react';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ShortPlaceInfo from '../../components/shortPlaceInfo/ShortPlaceInfo';
import { searchPlaceByIdAC } from '../../middleware/searchPlaceById';
import BookingForm from '../../components/bookingForm/BookingForm';
import TablePlan from '../../components/bookingForm/TablePlan/TablePlan';

class CafeBooking extends React.PureComponent {

    static propTypes = {
        place: PropTypes.object.isRequired,
        places: PropTypes.array
    };

    state = {
        isUpdate: false
    };

    componentDidMount() {
        let placeId = parseInt(this.props.match.params.placeId);
        this.props.dispatch(searchPlaceByIdAC({ body: { placeId: placeId, places: this.props.places } }));
    }

    componentDidUpdate(oldProps, oldState) {
        let placeId = parseInt(this.props.match.params.placeId);
        if (oldProps.place.length && oldProps.place.mainPlaceInfo.id === placeId) {
            this.setState({ isUpdate: true })
        }
        if (!oldProps.place.length) {
            this.setState({ isUpdate: true })
        }
    }

    render() {
        return (
            <Fragment>
                {
                    (this.props.place.mainPlaceInfo) &&
                    <div className="container">
                        <div className="row" >
                            <div className="col-md-12 mb-md-3" style={{textAlign: "center"}}>
                                <h2>Бронирование столика в {this.props.place.mainPlaceInfo.name}</h2>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <BookingForm mainInfo={this.props.place.mainPlaceInfo} />
                            </div>
                            <div className="col-md-6">
                                <TablePlan tablesInfo={this.props.place.tablesInfo} />
                            </div>
                        </div>
                    </div>
                }
            </Fragment>
        )
    }
}

const mapStateToProps = function (state) {
    return {
        place: state.placesReducer.place,
        places: state.placesReducer.places
    };
};

export default connect(mapStateToProps)(withRouter(CafeBooking));