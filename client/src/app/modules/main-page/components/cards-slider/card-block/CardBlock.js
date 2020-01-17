import React from 'react';
import { withRouter } from "react-router";
import PropTypes from 'prop-types';

import '../CardsSlider.css';

class CardBlock extends React.PureComponent {

    static propTypes = {
        places: PropTypes.array
    };

    getCard = (cardInfo) => {
        if (cardInfo) {
            return (
                <div key={cardInfo.mainPlaceInfo.id} className="col-lg-4 col-md-12 col-12 col-12">
                    <div className="card mr-md-auto ml-md-auto mr-sm-auto ml-sm-auto mr-auto ml-auto" style={{ width: "18rem" }}>
                        <img className="card-img-top" src={`/src/img/main-page/cardImage/${cardInfo.mainPlaceInfo.id}.jpg`} alt="Card image cap" />
                        <div className="card-body" style={{textAlign: "center"}}> 
                            <h5 className="card-title">{cardInfo.mainPlaceInfo.name}</h5>
                            <p className="card-text">{cardInfo.mainPlaceInfo.mainPageDescription}</p>
                            <button className="btn btn-primary" type="button" onClick={(e) => this.bookTable(cardInfo.mainPlaceInfo.id)}>Забронировать</button>
                        </div>
                    </div>
                </div>
            )
        }
    }

    bookTable = (id) => {
        this.props.history.push('/cafe/' + id + '/booking');
    }

    render() {
        return (
            <div className="row">
                {
                    this.props.places.map((place) => this.getCard(place))
                }
            </div>
        )
    }
}


export default withRouter(CardBlock);