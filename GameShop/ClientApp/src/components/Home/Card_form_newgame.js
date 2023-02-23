import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import style from './HomeCards.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Card_form_newgame() {

    const [dbdata, setDbData] = React.useState([]);
  
    const redirect = useHistory();
  

    useEffect(() => {

       
           
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify()
            };

           
            fetch('http://localhost:56116/api/get_new_games', requestOptions)
                .then(response => response.json())
                .then((responseData) => {
                    setDbData(responseData)
                   
                    
                });
        

    }, []);


    const redirect_to_purchase = (ev) =>
    {
       
       
        redirect.push('/Purchase', { GameName: ev.target.getAttribute('alt') });
    }


    if (dbdata.length > 0)
    return (



       

           
        <div className={style.card_new_game } >

                {dbdata.map(item => {

                    return (

                        <div className={style.Cards} onClick={redirect_to_purchase} alt={item.Game_name} >

                            <div className={style.card_body }>

                                <img  className={style.card_image} alt={item.Game_name} src={item.Cover}  />

                                
                                <h6 class="card-title" style={{margin:"5px", color: "white" }}
                                                            alt={item.Game_name}>{item.Game_name}</h6>
                                    
                              

                            </div>

                        </div>
             
                    );
                })}

                
            </div>

       
        );
    else
        return (
            <div class="spinner-border" role="status" >
                <span class="visually-hidden"></span>
            </div>
        )
}




