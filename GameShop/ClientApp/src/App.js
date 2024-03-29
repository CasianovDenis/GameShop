import React, { Component , useState} from 'react';
import { Route } from 'react-router';

import Layout from './components/NavMenu/Layout';

import Home from './components/Home/Home';

import PurchasePage from './components/PurchasePage/PurchasePage';

import SignIn from './components/SignIn/SignIn';

import SignUp from './components/SignUp/SignUp';

import UserGames from './components/UserGames/UserGames';

import AllGames from './components/Browse_allgame/AllGames';

import Settings from './components/Settings/Settings';

import Footer from './components/Footer/Footer';

import About from './components/About/About';

import { Context} from './components/Context.js'
import './custom.css'


export default function App() {

    const [context, setContext] = useState(null);

    return (
        <Context.Provider value={[context , setContext]}>
        <Layout>

            <Route exact path='/' component={Home} />
            <Route exact path='/Purchase' component={PurchasePage} />
            <Route exact path='/SignIn' component={SignIn} />
            <Route exact path='/SignUp' component={SignUp} />
            <Route exact path='/UserGames' component={UserGames} />
            <Route exact path='/AllGames' component={AllGames} />
            <Route exact path='/Settings' component={Settings} />
            <Route exact path='/About' component={About} />

            <Footer />
            </Layout>
        </Context.Provider>
    );
  
}
