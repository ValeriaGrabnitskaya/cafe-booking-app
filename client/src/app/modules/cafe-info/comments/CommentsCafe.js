import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";

import { searchPlaceByIdAC } from '../../../core/middleware/searchPlaceById';
import CommentForm from './comment-form/CommentForm';
import CommentTable from './comment-table/CommentTable';

class CommentsCafe extends React.PureComponent {

    static propTypes = {
        places: PropTypes.array,
        place: PropTypes.object.isRequired
    };

    componentDidMount() {
        let placeId = parseInt(this.props.match.params.placeId);
        this.props.dispatch(searchPlaceByIdAC({ body: { placeId: placeId, places: this.props.places } }));
    }

    render() {
        return (
            <Fragment>
                {
                    (this.props.place) &&
                    <Fragment>
                        <CommentForm place={this.props.place} onUpdatePlace={this.onUpdatePlace} />
                        <CommentTable place={this.props.place} />
                    </Fragment>
                }
            </Fragment>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        places: state.placesReducer.places,
        place: state.placesReducer.place,
    };
};

export default connect(mapStateToProps)(withRouter(CommentsCafe));
