import React from 'react';

import './PicturesSlider.css';

const PicturesSlider = () => {
    let text = (
        <div className="carousel-caption d-none d-md-block TextBlock">
            <h5>Ресторан Astoria Riverside</h5>
        </div>
    );
    return (
        <div id="carouselExampleIndicators" className="carousel slide carousel-fade mb-5" data-ride="carousel">
            <ol className="carousel-indicators">
                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img className="d-block Picture FirstPicture" />
                    {text}
                    
                </div>
                <div className="carousel-item">
                    <img className="d-block Picture SecondPicture" />
                    {text}
                </div>
                <div className="carousel-item">
                    <img className="d-block Picture ThirdPicture" />
                    {text}
                </div>
            </div>
            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
            </a>
            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
            </a>
        </div>
    )
}

export { PicturesSlider };