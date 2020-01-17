import React, { Fragment } from 'react';

import searchFormEntryPoints from '../../../shared/constants/searchFormEntryPoints';
import CafeTable from '../components/cafe-table/CafeTable';
import CafeSearch from '../../../shared/components/cafe-search/CafeSearch';

class CafeCatalog extends React.PureComponent {

    render() {
        return (
            <Fragment>
                <CafeSearch entryPoint={searchFormEntryPoints.CATALOG} />
                <CafeTable />
            </Fragment>
        )
    }
}

export default CafeCatalog;