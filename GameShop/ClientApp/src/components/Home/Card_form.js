import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import style from './Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Card_form() {

    const [dbdata, setDbData] = React.useState([]);
    const [request, setRequest] = useState(true);
    const redirect = useHistory();
  

    useEffect(() => {

        if (request == true) {

           
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify()
            };

           
            fetch('http://localhost:56116/api/get_new_games', requestOptions)
                .then(response => response.json())
                .then((responseData) => {
                    setDbData(responseData)
                    setRequest(false);
                    
                });
        }

    }, [dbdata]);


    const redirect_to_purchase = (ev) =>
    {
       
        redirect.push('/Purchase', { GameName: ev.target.getAttribute('alt') });
    }



    return (



        <div >

           
            <div >
                <p className={style.newgame }>New game</p>

                {dbdata.map(item => {

                    return (

                        <div className={style.Cards} onClick={redirect_to_purchase} >

                            <div style={{ width: "10rem" }} >

                                <img class="card-img-top" id={style.card_image} src={item.Cover} alt={item.Game_name} />

                                <div class="card-body">
                                    <h6 class="card-title" style={{color:"white"} }>{ item.Game_name}</h6>
                                    
                                </div>

                            </div>

                        </div>
             
                    );
                })}

                
            </div>

        </div>
    );
}




