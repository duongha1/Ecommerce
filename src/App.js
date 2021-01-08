import React from 'react';
import ShoppingAdmin from './components/admin/ShoppingAdmin';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Login from './components/admin/Login';
import AllProducts from './components/client/AllProducts';
import ProductDetail from './components/client/ProductDetail';
import NavBarClient from './components/client/NavBarClient'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin/login">
          <Login/>
        </Route>
        <Route path="/admin">
          <ShoppingAdmin/>
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
  );
}

export default App;
