import React, {useEffect,useState } from 'react';
import { useHistory } from 'react-router-dom';

import style from './AllGames.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AllGames() {

    const [dbdata, setDbData] = React.useState(null);
    const [request, setRequest] = useState(true);
    const redirect = useHistory();


    useEffect(() => {

        if (request == true) {


            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify()
            };


            fetch('http://localhost:56116/api/get_all_games', requestOptions)
                .then(response => response.json())
                .then((responseData) => {
                    setDbData(responseData)
                    setRequest(false);

                });
        }

    }, [dbdata]);


    const redirect_to_purchase = (ev) => {

        redirect.push('/Purchase', { GameName: ev.target.getAttribute('alt') });
    }



    if (dbdata != null)
    return (



        <div >


            <div >
                <p className={style.text_discover_games}>Discover games</p>

                {dbdata.map(item => {

                    return (


                        <div className={style.Cards} onClick={redirect_to_purchase} >

                            <div style={{ width: "10rem" }} >

                                <img class="card-img-top" id={style.card_image} src={item.Cover} alt={item.Game_name} />

                                <div class="card-body" className={style.card_body}>
                                    <h6 class="card-title" style={{ color: "white", marginLeft: "10px" }}>
                                        {item.Game_name}</h6>

                                    <h6 className={style.card_price}>{item.Price}$</h6>
                                </div>

                            </div>

                        </div>

                    );
                })}


            </div>

        </div>
        );

    else

        return (
            <div class="spinner-border" role="status" >
                <span class="visually-hidden"></span>
            </div>
            )
}