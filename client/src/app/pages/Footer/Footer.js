import React from 'react';

import './Footer.css';

const Footer = () => {

    return (
        <footer className="Footer">
            <div className="container" style={{ margin: "auto", textAlign: "center" }}>
                <div className="row">
                    <div className="col-md-6">
                        <img className="Icon" src="/src/img/footer/telephone.svg" alt="Telephone" />
                        <span className="TextIcon">+375 (29) 123-45-67</span>
                    </div>
                    <div className="col-md-6">
                        <a href="#">
                            <img className="IconGroup" src="/src/img/footer/instagram.svg" alt="Instagram" />
                        </a>
                        <a href="#">
                            <img className="IconGroup" src="/src/img/footer/telegram.svg" alt="Telegram" />
                        </a>
                        <a href="#">
                            <img className="IconGroup" src="/src/img/footer/viber.svg" alt="Viber"/>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    )

}

export { Footer };