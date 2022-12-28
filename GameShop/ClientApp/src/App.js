import React, { Component } from 'react';
import { Route } from 'react-router';
import  Layout  from './components/NavMenu/Layout';
import Home from './components/Home/Home';
import PurchasePage from './components/PurchasePage/PurchasePage';

import './custom.css'

export default function App() {
 
    return (
        <Layout>

            <Route exact path='/' component={Home} />
            <Route exact path='/Purchase' component={PurchasePage} />

      </Layout>
    );
  
}
