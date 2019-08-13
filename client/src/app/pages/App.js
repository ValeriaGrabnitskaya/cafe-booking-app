import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

import PagesLinks from '../routes/PagesLinks/PagesLinks';
import PagesRouter from '../routes/PageRoutes/PagesRoutes';
import store from '../store/store';
import { Footer } from './Footer/Footer';

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
