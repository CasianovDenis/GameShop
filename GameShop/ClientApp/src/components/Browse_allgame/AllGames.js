import React, {useEffect,useState,useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Pagination } from 'semantic-ui-react';

import style from './AllGames.module.css';
import 'semantic-ui-css/semantic.min.css'


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import LoadingSpinner from '../public_files/LoadingSpinner';

export default function AllGames() {

    const [allgames, setAllGames] = React.useState(null);

    const [displayed_games, setDisplayedGames] = useState(null);

    const [show_searchbar, setShowSearchBar] = useState(false);

    const [foundgames, setFoundGames] = useState(null);

    const [total_page_number, setTotalPageNumber] = useState(null);
    const [sort_type, setSortType] = useState("Alphabetical");
    const [current_page_number, setCurrentPageNumber] = useState(1);

    const RefSearch = useRef("");


    const redirect = useHistory();


    useEffect(() => {



            const requestOptionsAllGames = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };


            fetch('http://localhost:56116/api/get_all_games', requestOptionsAllGames)
                .then(response => response.json())
                .then((responseData) => {

                    setAllGames(responseData)

                    let count = 1, range = 13;

                    for (let index = 1; index <= responseData.length; index++)

                        if (index === range) { count++; range = range + 13; }

                    setTotalPageNumber(count);
                    
                });

             

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
            };

            let url = 'http://localhost:56116/api/get_sorted_games_using_range/' + sort_type + '/' + 12;


            fetch(url, requestOptions)
            .then(response => response.json())
            .then((responseData) => {

                setDisplayedGames(responseData);
                   

            });

        

        

    }, []);

  
    const open_searchbar = () => {
        var element = document.getElementById('search_input');
        show_searchbar == false ? element.style.width = '230px' : element.style.width = '0px' ;
        show_searchbar == false ? setShowSearchBar(true) : setShowSearchBar(false);
    }
    const search = () => {

        let search_text = RefSearch.current.value;

                                //capitalize first letter
        search_text = search_text.charAt(0).toUpperCase() + search_text.slice(1);

        if (search_text.length >0 ) {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };

            let url = 'http://localhost:56116/api/Search_game/' + search_text;


            fetch(url, requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    setFoundGames(responseData);


                });
        }
        else
            setFoundGames(null);

      
    }

    const sorting_games = (ev) => {
        
        setSortType(ev.target.value);

        let number_games_must_displaying = 12 * current_page_number;

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        let url = 'http://localhost:56116/api/get_sorted_games_using_range/' + ev.target.value + '/' + number_games_must_displaying;

        fetch(url, requestOptions)
            .then(response => response.json())
            .then((responseData) => {

               
                setDisplayedGames(responseData);
             
            });

 }

    const change_page_number = (ev) => {

        setCurrentPageNumber(ev.target.getAttribute('value'));
       

        let number_games_must_displaying = 12 * ev.target.getAttribute('value');

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
           
        };

        let url = 'http://localhost:56116/api/get_sorted_games_using_range/' + sort_type + '/' + number_games_must_displaying;
       
        fetch(url, requestOptions)
            .then(response => response.json())
            .then((responseData) => {

              
                setDisplayedGames(responseData);
               
            });
       
    }

    const redirect_to_purchase = (ev) => {

        redirect.push('/Purchase', { GameName: ev.target.getAttribute('alt') });
    }


    if (foundgames !== null)
        return (

            <div >


                <p className={style.text_discover_games}>Discover games</p>

                <select  className={style.sort_elements} disabled>

                    <option selected >{sort_type}</option>

                </select>

               
                <div className={style.searchbar}>


                    <input id="search_input" type="text" ref={RefSearch} onChange={search} placeholder="Search.." style={{width:"0"} }/>

                    <button onClick={open_searchbar} >
                        <FontAwesomeIcon icon={faMagnifyingGlass}  /> </button>

                </div>

                {foundgames.map(item => {

                    return (


                        <div className={style.Cards} onClick={redirect_to_purchase} >

                            <div style={{ width: "10rem" }} >

                                <img className={style.card_image} src={item.Cover} alt={item.Game_name} />

                                <div class="card-body" className={style.card_body} alt={item.Game_name}>
                                    <h6 class="card-title" style={{ color: "white", marginLeft: "10px" }} alt={item.Game_name}>
                                        {item.Game_name}</h6>

                                    <h6 className={style.card_price}>{item.Price}$</h6>
                                </div>

                            </div>

                        </div>

                    );
                })}




            </div>
        );

    else

        if (displayed_games !== null)
            return (

                <div>
                    <p className={style.text_discover_games}>Discover games</p>



                    <select onChange={sorting_games} className={style.sort_elements} value={ sort_type}>
                       
                        <option value="Alphabetical">Alphabetical</option>
                        <option value="Newest">Newest</option>
                        <option value="Low to High">Price: Low to High</option>
                        <option value="High to Low">Price: High to Low</option>
                       

                    </select>

                   
                    <div className={style.searchbar}>

                      
                        <input id="search_input" type="text" ref={RefSearch} onChange={search} placeholder="Search.." style={{width:"0" }} required />
                       
                        <button onClick={open_searchbar} >
                            <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginRight: "4px" }} /> </button>

                    </div>

                    {displayed_games.map(item => {

                        return (


                            <div className={style.Cards} onClick={redirect_to_purchase} >

                                <div style={{ width: "10rem" }} >

                                    <img  className={style.card_image} src={item.Cover} alt={item.Game_name} />

                                    <div class="card-body" className={style.card_body} alt={item.Game_name}>
                                        <h6 class="card-title" style={{ color: "white", marginLeft: "10px" }} alt={item.Game_name}>
                                            {item.Game_name}</h6>

                                        <h6 className={style.card_price}>{item.Price}$</h6>
                                    </div>

                                </div>

                            </div>

                        );
                    })}


                    <div className={style.page_navigation}>
                    <Pagination
                        boundaryRange={5}
                        defaultActivePage={1}

                        firstItem={null}
                        lastItem={null}
                        siblingRange={1}
                        totalPages={total_page_number}

                        onClick={change_page_number}
                    />
                    </div>
                    
                </div>

                
       
        );

    else

            return (
                <LoadingSpinner />
            )
}
