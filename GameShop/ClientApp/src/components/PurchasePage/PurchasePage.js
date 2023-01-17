import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import style from './Purchase.module.css';


import CarouselGameImage from './CarouselGameImage';
import Modal_PaymentSystem from '../Payment/Modal_PaymentSystem';

import arrow_left from './arrow.png';
import GetCookie from "../public_files/GetCookie";


export default function PurchasePage() {

    const location = useLocation();
    const redirect = useHistory();

    const [gameinfo, setGameInfo] = useState(null);
    const [message, setMessage] = useState("");

    const [request, setRequest] = useState(true);


    let GameName = "";


    try {
         GameName = location.state.GameName;
    }
    catch {
        redirect.push('/');
    }
    

   
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



            fetch('http://localhost:56116/api/get_game', requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    setGameInfo(responseData);
                   
                    setRequest(false);

                });

            if (GetCookie("status_account") == "online") {

                const requestOptionsUser = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "Username": GetCookie("username"),
                        "Game_name": GameName

                    })
                };

                fetch('http://localhost:56116/api/checking_user_purchased_this_game', requestOptionsUser)
                    .then(response => response.json())
                    .then((responseData) => {


                        if (responseData == "Already bought") {

                            var div = document.getElementById('modal_payment');
                            div.style.display = "none";

                            setMessage(" You already bought this game");

                        }
                       

                        setRequest(false);

                    });
            }


           

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
                        <CarouselGameImage GameName={gameinfo.Game_name} />

                        <p className={style.DescriptionStyle}>{gameinfo.Description}</p>

                    </div>

                    <div className={style.BuyGame }>

                        <img className={style.CoverStyle} src={gameinfo.Cover} />

                        <br /><br />

                        <span class="badge bg-secondary">Base Game</span>

                        <br /><br />

                        <p style={{ color: "white" }}>{gameinfo.Price}$</p>

                        <div id="modal_payment">

                        <Modal_PaymentSystem game={gameinfo} />

                        </div>

                        <p style={{ color: "white", fontSize : "20px" }}>{message} </p>
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