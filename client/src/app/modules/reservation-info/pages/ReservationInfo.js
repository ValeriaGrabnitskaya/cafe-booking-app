import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router";
import dateFormat from 'dateformat';

import './ReservationInfo.css';

class ReservationInfo extends React.PureComponent {

    static propTypes = {
        bookInfo: PropTypes.object.isRequired
    }

    render() {
        return (
            <Fragment>
                {
                    (Object.keys(this.props.bookInfo).length !== 0) &&
                    <div className="jumbotron jumbotron-fluid ReservationInfo">
                        <div className="container" style={{textAlign: "center"}}>
                            <h3 className="display-4 mb-4">Ваш столик забронирован</h3>
                            <p>
                                <span className="Label">Заведение: </span><span className="lead">{this.props.bookInfo.placeName}</span>
                            </p>
                            <p>
                                <span className="Label">Дата: </span><span className="lead">{dateFormat(this.props.bookInfo.bookDate, 'dd.mm.yyyy')}</span>
                            </p>
                            <p>
                                <span className="Label">Время: </span><span className="lead">{'c ' + this.props.bookInfo.bookTimeFrom + ' по ' + this.props.bookInfo.bookTimeTo}</span>
                            </p>
                            <p>
                                <span className="Label">Номер столика: </span><span className="lead">{this.props.bookInfo.bookTable}</span>
                            </p>
                        </div>
                    </div>
                }
            </Fragment>
        )
    }
}
 
const mapStateToProps = function (state) {
    return {
        bookInfo: state.placesReducer.bookInfo,
    };
};

export default connect(mapStateToProps)(withRouter(ReservationInfo));


