import React, { Fragment } from 'react';

import { PicturesSlider } from '../components/pictures-slider/PicturesSlider';
import CardsSlider from '../components/cards-slider/CardsSlider';
import CafeSearch from './../../../shared/components/cafe-search/CafeSearch';
import entryPointsForSearchForm from '../../../shared/constants/searchFormEntryPoints';

class MainPage extends React.PureComponent {
    render() {
        return (
            <Fragment>
                <PicturesSlider />
                <CardsSlider />
                <CafeSearch entryPoint={entryPointsForSearchForm.MAIN_PAGE}/>
            </Fragment>
        )
    }
}

export default MainPage;