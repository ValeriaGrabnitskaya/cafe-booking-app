import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import CommentsCafe from '../comments/CommentsCafe';
import AboutCafe from '../about-cafe/AboutCafe';
import CafeBooking from '../../cafe-booking/pages/CafeBooking';

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
