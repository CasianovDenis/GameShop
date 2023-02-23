import React, {useEffect,useState } from "react";
import { useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import style from './Home.module.css';

import CarouselRandomGame from './CarouselRandomGame';
import Card_form_newgame from './Card_form_newgame';




export default function Home() {

    const redirect = useHistory();

    const redirect_to_allgames = () => {

        redirect.push('/AllGames');
    }

        return (

            <>
                <CarouselRandomGame />

                <p onClick={redirect_to_allgames} className={style.text_allgames}>Discover more games </p>

                <Card_form_newgame />
               

                </>
        )
    
}