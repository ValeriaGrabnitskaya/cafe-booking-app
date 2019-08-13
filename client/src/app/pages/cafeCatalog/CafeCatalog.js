import React, { Fragment } from 'react';

import CafeTable from '../../components/cafeTable/CafeTable.js';
import entryPointsForSearchForm from '../../constants/entryPointsForSearchForm';
import CafeSearch from '../../components/CafeSearch/CafeSearch';

class CafeCatalog extends React.PureComponent {

    render() {
        return (
            <Fragment>
                <CafeSearch entryPoint={entryPointsForSearchForm.CATALOG} />
                <CafeTable />
            </Fragment>
        )
    }
}

export default CafeCatalog;