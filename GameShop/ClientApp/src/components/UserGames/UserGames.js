import React, {useEffect,useState,useRef } from 'react';
import GetCookie from '../public_files/GetCookie';
import style from './UserGames.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function UserGames() {

    const [dbdata, setDbData] = useState(null);
    const [foundgame, setFoundGame] = useState(null);

    const [request, setRequest] = useState(true);

   const RefSearch = useRef("");

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


    const search = () => {

        let search_text = RefSearch.current.value;

        if (search_text == "") setFoundGame(null);
        else

            for (let index = 0; index < dbdata.length; index++) {

                if (dbdata[index].GameName.includes(search_text))
                    setFoundGame(dbdata[index]);
                    
        }


    }


    if (foundgame != null)
        return (

            <div >


                <p style={{ color: "white", fontSize: "20px" }}>My Games</p>

                <div className={style.searchbar}>

                    <input type="text" ref={RefSearch} onChange={search} placeholder="Search.." style={{ borderRadius: "6px" }} />
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginLeft: "5px" }} />


                </div>

              

                        <div className={style.ListOfGame}  >


                    <img className={style.GameImage} src={foundgame.URL_Image} />


                            <div className={style.gamename}>

                        <p className={style.gamename_text}> {foundgame.GameName} </p>

                            </div>


                    <p className={style.key_text}> {foundgame.KeyOfGame} </p>


                        </div>           




            </div>
        );

else
    if (dbdata != null) 
    return (

        <div >


            <p style={{ color: "white", fontSize:"20px" }}>My Games</p>

            <div className={style.searchbar}>

                <input type="text" ref={RefSearch} onChange={search} placeholder="Search.." style={{ borderRadius: "6px" }} />
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginLeft:"5px" }} />
               

            </div>

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