import React from 'react';
import { withRouter } from "react-router";

import CafePagesRouter from './cafe-pages-router/CafePagesRouter';
import CafePageLinks from './cafe-pages-links/CafePagesLinks';

class AppCafe extends React.PureComponent {

  render() {
    let placeId = parseInt(this.props.match.params.placeId);
    return (
      <div className="container">
          <CafePageLinks placeId={placeId} />
          <CafePagesRouter />
      </div>
    );
  }
}

export default withRouter(AppCafe);
