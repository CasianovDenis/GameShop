import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useHistory } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import style from './Purchase.module.css';


import CarouselGameImage from './CarouselGameImage';
import Modal_PaymentSystem from '../Payment/Modal_PaymentSystem';
import GameCommentary from './GameCommentary';

import arrow_left from './arrow.png';
import GetCookie from "../public_files/GetCookie";
import LoadingSpinner from '../public_files/LoadingSpinner';

export default function PurchasePage() {

    const location = useLocation();
    const redirect = useHistory();

    const [gameinfo, setGameInfo] = useState(null);
    const [message, setMessage] = useState("");

    const [display_modal_payment, setDisplayModalPayment] = useState("block");
    var GameName = "";

    try {
        GameName = location.state.GameName;
    }
    catch {
        redirect.push('/')
    }
    

   
    useEffect(() => {

       
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };



            fetch('http://localhost:56116/api/get_game/'+ GameName, requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    setGameInfo(responseData);

                });

            if (GetCookie("status_account") == "online") {

                
                let url = 'http://localhost:56116/api/checking_user_purchased_this_game/' + GetCookie("username") + '/' + GameName +
                                                                                             '/' + GetCookie('auth_token');

                fetch(url, requestOptions)
                    .then(response => response.json())
                    .then((responseData) => {


                        if (responseData == "Already bought") {


                            setDisplayModalPayment("none");

                            setMessage(" You already bought this game");

                        }
                       

                    });
            


           

        }
    }, []);


    const Back = () => {

        redirect.goBack();

    }


    if (gameinfo != null) {
        return (


           
            <>
                <img src={arrow_left} style={{ width: "25px", height: "25px", cursor: "pointer" }} onClick={Back} />

            <div className={ style.purchase_div}>

                    <div className={style.GameInfo }>

                        <p style={{ fontSize:"25px",color:"white"}}>{gameinfo.Game_name}</p>
                        <CarouselGameImage GameName={gameinfo.Game_name} />

                        <p style={{color:"white"} }>{gameinfo.Description}</p>

                    </div>

                    <div className={style.BuyGame }>

                        <img className={style.CoverStyle} src={gameinfo.Cover} />

                       

                        <span class="badge bg-secondary">Base Game</span>

                      

                        <p style={{ color: "white" }}>{gameinfo.Price}$</p>

                    <div style={{ display: display_modal_payment }}>

                        <Modal_PaymentSystem game={gameinfo} />

                        </div>

                        <p style={{ color: "white", fontSize : "20px" }}>{message} </p>
                </div>


                </div>
                <GameCommentary game_name={GameName} />
              </>  
            


        )
    }
    else
        return (

            <LoadingSpinner />
            )

}