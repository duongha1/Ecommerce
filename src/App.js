import React from 'react';
import ShoppingAdmin from './components/admin/ShoppingAdmin';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './components/admin/Login';
import AllProducts from './components/client/AllProducts';
import ProductDetail from './components/client/ProductDetail';
import NavBarClient from './components/client/NavBarClient'
import {createStore} from 'redux'
import Reducer from './components/reducer/Reducer'
import {Provider} from 'react-redux'
import Cart from './components/client/Cart'
import LoginClient from './components/client/LoginClient';

function App() {
  
  const store = createStore(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/admin/login">
            <Login/>
          </Route>
          <Route path="/admin">
            <ShoppingAdmin/>
          </Route>
          <Route path="/login">
            <LoginClient/>
          </Route>
          <Route path="/cart">
            <Cart/>
          </Route>
          <Route path="/products/:id">
            <NavBarClient/>
            <ProductDetail/>
          </Route>
          <Route path="/products">
            <NavBarClient/>
            <AllProducts/>
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
