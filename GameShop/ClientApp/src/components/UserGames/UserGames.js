import React, { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { toaster} from 'evergreen-ui';

import 'semantic-ui-css/semantic.min.css'

import copy_icon from './copy_icon.svg';

import GetCookie from '../public_files/GetCookie';
import ScrollTopButton from '../public_files/ScrollTopButton';

import style from './UserGames.module.css';

import { useHistory } from 'react-router-dom';

export default function UserGames() {

    const [dbdata, setDbData] = useState(null);
    const [foundgames, setFoundGames] = useState(null);
 
    const [request, setRequest] = useState(true);

    const redirect = useHistory();
   

   const RefSearch = useRef("");

    useEffect(() => {


        if (request == true) {


            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                
            };




            fetch('http://localhost:56116/api/get_user_games/' + GetCookie("username"), requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    if (responseData.length>0)
                    setDbData(responseData);

                    setRequest(false);


                });
        }


    }, [dbdata]);


    const search = () => {

        let array_found_games = Array(dbdata.length);
        let position = 0;

        let search_text = RefSearch.current.value;

        if (search_text == "") setFoundGames(null);
        else
        {

            for (let index = 0; index < dbdata.length; index++) {

                if (dbdata[index].GameName.toLowerCase().includes(search_text)) {

                    array_found_games[position] = dbdata[index];
                    position++;

                }
                else

                    if (dbdata[index].GameName.includes(search_text)) {

                        array_found_games[position] = dbdata[index];
                        position++;

                    }
            }
           
            setFoundGames(array_found_games);
        }
        }

    const Copy = (ev) => {

        let key = ev.target.getAttribute('title');

        navigator.clipboard.writeText(key);
    }

    const redirect_to_allgames = () => {

        redirect.push('/AllGames');
    }

   
  

    if (foundgames != null)
        return (

            <div >


                <p style={{ color: "white", fontSize: "20px" }}>My Games</p>

                <div className={style.searchbar}>

                    <input type="text" ref={RefSearch} onChange={search} placeholder="Search.." style={{ borderRadius: "6px" }} />
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginLeft: "5px" }} />


                </div>

                {foundgames.map(item => {

                    return (

                        <div className={style.ListOfGame}  >


                            <img className={style.GameImage} src={item.URL_Image} />


                            <div className={style.div_gamename}>

                                <p className={style.gamename_text}> {item.GameName} </p>

                            </div>


                            <p className={style.key_text}> {item.KeyOfGame} </p>


                        </div>

                    );
                })}




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


                            <div className={style.div_gamename}>

                                <p className={style.gamename_text}> {item.GameName} </p>

                            </div>

                            
                      


                            <p className={style.key_text} onClick={Copy} > {item.KeyOfGame}
                                <img src={copy_icon} onClick={() => toaster.success('Key of game copied')}
                                    className={style.copy_icon } title={item.KeyOfGame}/>

                            </p>
                            
                           
                           
                        </div>

                    );
                })}

            <ScrollTopButton />
        </div>
        );

    else

        return (
            <div >


                <p style={{ color: "white", fontSize: "20px" }}>My Games</p>

                <p style={{ color: "white", fontSize: "30px" }}> You library is empty</p>

                <p style={{ color: "#444a75", fontSize: "25px", cursor: "pointer" }} onClick={redirect_to_allgames}>Go to shop</p>

            </div>
        )

}