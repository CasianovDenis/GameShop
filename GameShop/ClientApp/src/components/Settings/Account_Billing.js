import React, { useEffect, useRef, useState } from 'react';

import style from './Settings.module.css';

import GetCookie from '../public_files/GetCookie';


export default function Account_Billing() {

    
    const [latest_purchased, setLatestPurchased] = useState(null);
  

    useEffect(() => {

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };


      
            fetch('http://localhost:56116/api/get_latest_purchased_game/' + GetCookie("username"), requestOptions)
            .then(response => response.json())
            .then((responseData) => {

                if (responseData != "Incorrect username")
                    setLatestPurchased(responseData);

               
            });

    }, []);

    

    if (latest_purchased != null)
    return (

        <div>


            <div className={style.billing_settings}>


                <label style={{ marginTop: "10px", marginLeft: "10px", fontSize: "18px" }}>Billing Activity</label>
                <hr />
                <p style={{ fontSize: "18px", marginLeft:"10px" }}> Latest transaction </p>

                <div className={ style.purchased_div}>

                    <img className={ style.purchased_image } src={latest_purchased.Cover}  />

                    <div style={{ width: "80px" }}>

                        <p className={style.purchased_name}>{latest_purchased.Game_name}</p>

                    </div>

                    <p className={ style.purchased_price}>{latest_purchased.Price} {latest_purchased.Currency}</p>

                    </div>
              
            </div>


        </div>
    )
    else
    return (

        <div>




            <div className={style.billing_settings}>


                <label style={{ marginTop: "10px", marginLeft: "10px", fontSize: "18px" }}>Billing Activity</label>
                <hr />

                <p>You don't have any transaction </p>

            </div>


        </div>
    )

}