import React from 'react';
import { NavLink } from 'react-router-dom';

import './PagesLinks.css';

class PagesLinks extends React.Component {

    render() {

        return (
            // <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 fixed-top navBar Navigation">
            //     <h1 className="my-0 mr-md-auto Logo">CafeBook</h1>
            //     <nav className="my-2 my-md-0 mr-md-auto">
            //         <NavLink to="/" exact className="p-4 PageLink" activeClassName="ActivePageLink">Главная</NavLink>
            //         <NavLink to="/about" className="p-4 PageLink" activeClassName="ActivePageLink">О нас</NavLink>
            //         <NavLink to="/catalog/1" className="p-4 PageLink" activeClassName="ActivePageLink">Каталог заведений</NavLink>
            //         <NavLink to="/booking-conditions" className="p-4 PageLink" activeClassName="ActivePageLink">Условия бронирования</NavLink>
            //     </nav>
            // </div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light Navigation">
                <h1 className="my-0 mr-md-auto Logo">CafeBook</h1>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto ml-auto">
                        <li className="nav-item active">
                            <NavLink to="/" exact className="p-4 PageLink" activeClassName="ActivePageLink">Главная</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/about" className="p-4 PageLink" activeClassName="ActivePageLink">О нас</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/catalog/1" className="p-4 PageLink" activeClassName="ActivePageLink">Каталог заведений</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/booking-conditions" className="p-4 PageLink" activeClassName="ActivePageLink">Условия бронирования</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        );

    }

}

export default PagesLinks;