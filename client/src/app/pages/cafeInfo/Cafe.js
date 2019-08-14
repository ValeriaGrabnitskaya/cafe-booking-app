import React from 'react';
import { withRouter } from "react-router";

import CafePagesRouter from './CafePagesRouter';
import CafePageLinks from './CafePageLinks/CafePageLinks';

class Cafe extends React.PureComponent {

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

export default withRouter(Cafe);
