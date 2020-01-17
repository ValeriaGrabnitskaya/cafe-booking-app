import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './CardsSlider.css';
import CardBlock from './card-block/CardBlock';

class CardsSlider extends React.PureComponent {

    static propTypes = {
        places: PropTypes.array
    };

    getCardBlock = () => {
        if (this.props.places) {
            let places = this.slicePlaces();
            return places.map((placesBlock) => {
                if (places.indexOf(placesBlock, 0) === 0) {
                    return (
                        <div key={places.indexOf(placesBlock, 0)} className={'carousel-item active'}>
                            <CardBlock places={placesBlock} />
                        </div>
                    )
                } else {
                    return (
                        <div key={places.indexOf(placesBlock, 0)} className={'carousel-item'}>
                            <CardBlock places={placesBlock} />
                        </div>
                    )
                }

            })
        }
    }

    slicePlaces = () => {
        let slicePlaces = this.props.places.slice(0, 9);
        let slicedPlaces = [];
        for (let i = 0; i < slicePlaces.length; i++) {
            slicedPlaces.push(slicePlaces.slice(i, i + 3));
            i += 2;
        }
        return slicedPlaces;
    }

    render() {
        return (
            <div className="container">
                <div id="carouselExampleControls" className="carousel slide w-100 mb-5" data-ride="carousel">
                    <div className="carousel-inner">
                        {this.getCardBlock()}
                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        )
    }

}

const mapStateToProps = function (state) {
    return {
        places: state.placesReducer.places
    };
};


export default connect(mapStateToProps)(CardsSlider);