import React from 'react';
import { Route } from 'react-router-dom';

import AppCafe from '../../../modules/cafe-info/AppCafe';
import { AboutPage } from '../../../modules/about/pages/AboutCafe';
import { BookingCondition } from '../../../modules/booking-conditions/pages/BookingCondition';
import ReservationInfo from '../../../modules/reservation-info/pages/ReservationInfo';
import Authentification from '../../../modules/authentification/pages/Authentification';
import CafeCatalog from '../../../modules/cafe-catalog/pages/CafeCatalog';
import MainPage from './../../../modules/main-page/pages/MainPage';

class PagesRouter extends React.Component {
          
  render() {

    return (
      <main role="main" className="mb-5">
        <Route path="/" exact={true} component={MainPage} />
        <Route path="/authentification" component={Authentification} />
        <Route path="/about" component={AboutPage} />
        <Route path="/catalog/:page/:entry?" component={CafeCatalog} />
        <Route path="/cafe/:placeId" component={AppCafe} />
        <Route path="/booking-conditions" component={BookingCondition} />
        <Route path="/reservation-info" component={ReservationInfo} />
      </main>
    );
  }
}

export default PagesRouter;
