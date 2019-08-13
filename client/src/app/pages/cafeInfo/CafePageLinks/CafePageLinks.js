import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withRouter } from "react-router";

import './CafePageLinks.css';

class CafePageLinks extends React.Component {

    static propTypes = {
        placeId: PropTypes.number.isRequired
    }

    goToBookPage = (e) => {
        e.preventDefault();
        this.props.history.push('/cafe/' + this.props.placeId + '/booking');
    }

    render() {
        return (
            <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-0 bg-white mb-5 navBar2 NavigationCafe">
                <nav className="my-2 my-md-0 mr-md-auto ml-md-auto">
                    <NavLink to={"/cafe/" + this.props.placeId} className="p-4 PageLink" activeClassName="ActivePageLink">О кафе</NavLink>
                    {/* <NavLink to={"/cafe/" + this.props.placeId + "/menu"} className="p-4 PageLink" activeClassName="ActivePageLink">Меню</NavLink> */}
                    <NavLink to={"/cafe/" + this.props.placeId + "/comments/1"} className="p-4 PageLink" activeClassName="ActivePageLink">Отзывы</NavLink>
                    <button onClick={this.goToBookPage} type="button" className="btn btn-primary">Забронировать</button>
                </nav>
            </div>
        );

    }

}

export default withRouter(CafePageLinks);