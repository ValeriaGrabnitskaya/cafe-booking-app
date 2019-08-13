import React, { Fragment } from 'react';

import { PicturesSlider } from '../../components/PicturesSlider/PicturesSlider';
import CardsSlider from '../../components/CardsSlider/CardsSlider';
import entryPointsForSearchForm from '../../constants/entryPointsForSearchForm';
import CafeSearch from '../../components/CafeSearch/CafeSearch';

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