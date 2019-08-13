import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from "react-router";

import { searchPlaceByIdAC } from '../../../middleware/searchPlaceById';
import './AboutCafe.css';
import Gallery from '../../../components/Gallery/Gallery';

class AboutCafe extends React.PureComponent {

    static propTypes = {
        place: PropTypes.object.isRequired,
        places: PropTypes.array
    };

    componentWillMount() {
        let placeId = parseInt(this.props.match.params.placeId);
        this.props.dispatch(searchPlaceByIdAC({ body: { placeId: placeId, places: this.props.places } }));
    }

    render() {
        console.log(this.props.place)
        return (
            <Fragment>
                {
                    (Object.keys(this.props.place).length > 0) &&
                    <Fragment>
                        <div className="row mb-5">
                            <div className="col-3">
                                <img src={`/src/img/${this.props.place.mainPlaceInfo.id}/${this.props.place.mainPlaceInfo.id}.jpg`} className="w-100 h-q00" />
                            </div>
                            <div className="col-9">
                                <h2 className="mb-5">{this.props.place.mainPlaceInfo.name}</h2>
                                <span>Режим работы: </span><span>{this.props.place.mainPlaceInfo.operationMode}</span>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p>{this.props.place.mainPlaceInfo.mainPageDescription}</p>
                                <p>{this.props.place.mainPlaceInfo.description}</p>
                            </div>
                        </div>
                        <div className="row mb-md-3">
                            <h4 className="mb-md-2">Галерея</h4>
                            <Gallery place={this.props.place}/>
                        </div>
                        <div className="mb-md-3">
                            <h4 className="mb-md-2">Контакты</h4>
                            <p><span style={{fontWeight: "500"}}>Телефон: </span><span>{this.props.place.mainPlaceInfo.contacts.phone}</span></p>
                            <p><span style={{fontWeight: "500"}}>Адрес: </span><span>{this.props.place.mainPlaceInfo.contacts.address}</span></p>
                        </div>
                    </Fragment>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        place: state.placesReducer.place,
        places: state.placesReducer.places
    };
};

export default connect(mapStateToProps)(withRouter(AboutCafe));
