import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import PagesRouter from './core/routes/pages-routes/PagesRoutes';
import PagesLinks from './core/components/pages-links/PagesLinks';
import { Footer } from './core/components/footer/Footer';
import store from './core/store/store';

class App extends React.PureComponent {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <PagesLinks />
          <PagesRouter />
          <Footer />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;

