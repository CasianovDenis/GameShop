import React, { Component } from 'react';
import { Route } from 'react-router';
import  Layout  from './components/NavMenu/Layout';
import Home from './components/Home/Home';
import PurchasePage from './components/PurchasePage/PurchasePage';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';

import './custom.css'

export default function App() {
 
    return (
        <Layout>

            <Route exact path='/' component={Home} />
            <Route exact path='/Purchase' component={PurchasePage} />
            <Route exact path='/SignIn' component={SignIn} />
            <Route exact path='/SignUp' component={SignUp} />

      </Layout>
    );
  
}
