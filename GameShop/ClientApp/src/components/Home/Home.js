import React, {useEffect,useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import CarouselRandomGame from './CarouselRandomGame';
import Card_form_newgame from './Card_form_newgame';
import Footer from '../Footer/Footer';



export default function Home() {

    
        return (

            <>
             <CarouselRandomGame />
                <Card_form_newgame />
                <Footer />

                </>
        )
    
}