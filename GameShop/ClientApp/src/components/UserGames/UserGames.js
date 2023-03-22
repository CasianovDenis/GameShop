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
 
    const [show_searchbar, setShowSearchbar] = useState(false);
    const [sort_type, setSortType] = useState("Alphabetical");
    
    const redirect = useHistory();
    const username = GetCookie("username");
    const auth_token = GetCookie("auth_token");

   const RefSearch = useRef("");

    useEffect(() => {


    if (GetCookie("status_account") != "online" && auth_token.match(/^[A-Za-z0-9]*$/) && auth_token.length == 25) redirect.push('/');


            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                
            };




            fetch('http://localhost:56116/api/get_user_games/' + username+'/'+auth_token, requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    if (responseData != "Incorrect authorization token" && responseData != "Incorrect Username" && responseData.length > 0)
                        setDbData(responseData);
                   

                });
        


    }, []);

    const open_searchbar = () => {

        let element = document.getElementById('search_input');
        show_searchbar == false ? element.style.width = "230px" : element.style.width = "0px";
        show_searchbar == false ? setShowSearchbar(true) : setShowSearchbar(false);

    }
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

    const sorting_games = (ev) => {

        let sort_option = ev.target.value;
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },

        };




        fetch('http://localhost:56116/api/get_sort_user_games/' + username + '/' + auth_token+'/'+sort_option, requestOptions)
            .then(response => response.json())
            .then((responseData) => {

                if (responseData != "Incorrect authorization token" && responseData != "Incorrect sort type" && responseData.length > 0) {
                    setDbData(responseData);
                    setSortType(sort_option);
                }


            });

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

            <div className={ style.UserGames}>


                <p style={{ color: "white", fontSize: "20px" }}>My Games</p>



                <div className={style.searchbar}>


                    <input id='search_input' type="text" ref={RefSearch} onChange={search} placeholder="Search.." style={{ width: "0" }} />
                    <button onClick={open_searchbar}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} /></button>


                </div>

                <select className={style.sort_elements} disabled>

                    <option selected >{sort_type}</option>

                </select>

                {foundgames.map(item => {

                    return (

                        <div className={style.ListOfGame}  >


                            <img className={style.GameImage} src={item.URL_Image} />


                            <div className={style.div_gamename}>

                                <p className={style.gamename_text}> {item.GameName} </p>

                            </div>


                            <p className={style.key_text} onClick={Copy} > {item.KeyOfGame}
                                <img src={copy_icon} onClick={() => toaster.success('Key of game copied')}
                                    className={style.copy_icon} title={item.KeyOfGame} />

                            </p>


                        </div>

                    );
                })}




            </div>
        );

else
    if (dbdata != null) 
    return (

        <div className={style.UserGames}>


            <p style={{ color: "white", fontSize:"20px" }}>My Games</p>

            
            <div className={style.searchbar}>

              
                <input id='search_input' type="text" ref={RefSearch} onChange={search} placeholder="Search.." style={{ width: "0" }} />
                <button onClick={open_searchbar}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginRight: "4px" }} /></button>
               

            </div>

            <select onChange={sorting_games} className={style.sort_elements} value={sort_type}>

                <option value="Alphabetical">Alphabetical</option>
                <option value="Newest">Newest</option>


            </select>

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