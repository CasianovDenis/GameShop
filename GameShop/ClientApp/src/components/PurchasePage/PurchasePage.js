import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import style from './Purchase.module.css';


import SlideShowPurchase from './SlideShowPurchase';
import Modal_PaymentSystem from '../Payment/Modal_PaymentSystem';

import arrow_left from './arrow.png';


export default function PurchasePage() {

    const location = useLocation();
    const redirect = useHistory();

    let GameName = location.state.GameName;

    if (GameName == 'undefined') redirect.push('/');

    const [gameinfo, setGameInfo] = useState(null);
    

    const [request, setRequest] = useState(true);

   
    useEffect(() => {

        if (GameName == null) redirect.push('/');

        if (request == true) {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({

                    "Game_name": GameName

                })
            };



            //call api from backend and send json data,which create before

            fetch('http://localhost:56116/api/get_game', requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    setGameInfo(responseData);
                   
                    setRequest(false);

                });


           

        }
    }, [gameinfo]);


    const BacktoHome = () => {

        redirect.push('/');

    }


    if (gameinfo != null) {
        return (


            <div>

                <div>
                    <img src={arrow_left} style={{ width: "25px", height: "25px", cursor: "pointer" }} onClick={BacktoHome }/>
                    <br /><br />
                    <div className={style.GameInfo }>

                        <p className={style.NameofGame}>{gameinfo.Game_name}</p>
                        <SlideShowPurchase GameName={gameinfo.Game_name} />

                        <p className={style.DescriptionStyle}>{gameinfo.Description}</p>

                    </div>

                    <div className={style.BuyGame }>

                        <img className={style.CoverStyle} src={gameinfo.Cover} />

                        <br /><br />

                        <span class="badge bg-secondary">Base Game</span>

                        <br /><br />

                        <p style={{ color: "white" }}>{gameinfo.Price}$</p>

                        <Modal_PaymentSystem game={gameinfo} />

                    </div>
                </div>
                
            </div>


        )
    }
    else
        return (
            
            <div class="spinner-border" role="status" >
                <span class="visually-hidden"></span>
                </div>
            )

}