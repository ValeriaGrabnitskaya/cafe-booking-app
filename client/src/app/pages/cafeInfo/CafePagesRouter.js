import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import MenuCafe from './MenuCafe';
import CommentsCafe from './CommentsCafe';
import AboutCafe from './AboutCafe/AboutCafe';
import CafeBooking from './../cafeBooking/CafeBooking';
import ReservationInfo from './../reservationInfo/ReservationInfo';

class CafePagesRouter extends React.Component {

  render() {

    return (
      <Fragment>
        <Route path="/cafe/:placeId" exact={true} component={AboutCafe} />
        {/* <Route path="/cafe/:placeId/menu" component={MenuCafe} /> */}
        <Route path="/cafe/:placeId/comments/:page" component={CommentsCafe} />
        <Route path="/cafe/:placeId/booking" component={CafeBooking} />
      </Fragment>
    );
  }
}

export default CafePagesRouter;
