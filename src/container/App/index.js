import { withStyles } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalLoading from '../../components/GlobalLoading';
import configStore from '../../redux/configStore';
import theme from './../../commons/Theme/index';
import Modal from './../../components/Modal/index';
import styles from './styles';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import AdminLayoutRoute from '../../commons/Layout/AdminLayoutRoute';
import { ADMIN_ROUTES } from '../../constants';
import CssBaseline from '@material-ui/core/CssBaseline';

const store = configStore();
class App extends Component {
  renderAdminRoutes() {
    let xhtml = null;
    xhtml = ADMIN_ROUTES.map((route) => {
      return (
        <AdminLayoutRoute
          key={route.path}
          path={route.path}
          component={route.component}
          exact={route.exact}
          name={route.name}
        />
      );
    });
    return xhtml;
  }
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline></CssBaseline>
            <ToastContainer></ToastContainer>
            <GlobalLoading></GlobalLoading>
            <Modal></Modal>
            <Switch>{this.renderAdminRoutes()}</Switch>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default withStyles(styles)(App);
