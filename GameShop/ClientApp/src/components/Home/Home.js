import React, {useEffect,useState } from "react";
import { useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import style from './Home.module.css';

import CarouselRandomGame from './CarouselRandomGame';
import Card_form_newgame from './Card_form_newgame';




export default function Home() {

    const redirect = useHistory();

   

        return (

            <>
                <CarouselRandomGame />

                <p className={style.text_newgames}>New game on the site </p>

                <Card_form_newgame />
               

                </>
        )
    
}