import React, {useEffect,useState } from 'react';
import GetCookie from '../public_files/GetCookie';
import style from './UserGames.module.css';



export default function UserGames() {

    const [dbdata, setDbData] = useState(null);
    const [request, setRequest] = useState(true);


    useEffect(() => {


        if (request == true) {


            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({

                    "Username": GetCookie("username")

                })
            };




            fetch('http://localhost:56116/api/get_user_games', requestOptions)
                .then(response => response.json())
                .then((responseData) => {


                    setDbData(responseData);
                    setRequest(false);


                });
        }


    }, [dbdata]);






    if (dbdata != null) 
    return (

        <div >


            <p style={{ color: "white", fontSize:"20px" }}>My Games</p>

                {dbdata.map(item => {

                    return (

                        <div className={style.ListOfGame}  >

                           
                            <img className={style.GameImage } src={item.URL_Image} />


                            <div className={style.gamename}>

                                <p className={style.gamename_text}> {item.GameName} </p>

                            </div>


                            <p className={style.key_text}> {item.KeyOfGame} </p>

                           
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