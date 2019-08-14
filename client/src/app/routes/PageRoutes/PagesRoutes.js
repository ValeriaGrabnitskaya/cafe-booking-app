import React from 'react';
import { Route } from 'react-router-dom';

import MainPage from '../../pages/mainPage/MainPage';
import CafeCatalog from '../../pages/cafeCatalog/CafeCatalog';
import Cafe from '../../pages/cafeInfo/Cafe';
import { AboutPage } from '../../pages/AboutPage';
import { BookingCondition } from '../../pages/BookingCondition';
import ReservationInfo from '../../pages/reservationInfo/ReservationInfo';

class PagesRouter extends React.Component {
          
  render() {

    return (
      <main role="main" className="mb-5">
        <Route path="/" exact={true} component={MainPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/catalog/:page/:entry?" component={CafeCatalog} />
        <Route path="/cafe/:placeId" component={Cafe} />
        <Route path="/booking-conditions" component={BookingCondition} />
        <Route path="/reservation-info" component={ReservationInfo} />
      </main>
    );
  }
}

export default PagesRouter;
