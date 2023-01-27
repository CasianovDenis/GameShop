import React, {useEffect,useState,useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import { Pagination } from 'semantic-ui-react';


import style from './AllGames.module.css';
import 'semantic-ui-css/semantic.min.css'

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export default function AllGames() {

    const [allgames, setAllGames] = React.useState(null);

    const [displayed_games, setDisplayedGames] = useState(null);

    const [foundgames, setFoundGames] = useState(null);

    const [total_page_number, setTotalPageNumber] = useState(null);
    const [sort_type, setSortType] = useState("Alphabetical");
    const [current_page_number, setCurrentPageNumber] = useState(1);

    const [request, setRequest] = useState(true);
    const RefSearch = useRef("");


    const redirect = useHistory();


    useEffect(() => {

        if (request == true) {


            const requestOptionsAllGames = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify()
            };


            fetch('http://localhost:56116/api/get_all_games', requestOptionsAllGames)
                .then(response => response.json())
                .then((responseData) => {

                    setAllGames(responseData)

                    let count = 1, range = 13;

                    for (let index = 1; index <= responseData.length; index++)

                        if (index == range) { count++; range = range + 13; }

                    setTotalPageNumber(count);
                    
                });

             

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "Sort_Type": sort_type,
                "Selected_Games": 12
            })
        };



        fetch('http://localhost:56116/api/get_sorted_games_using_range', requestOptions)
            .then(response => response.json())
            .then((responseData) => {

                setDisplayedGames(responseData);
                    setRequest(false);

            });

        }

        

    }, [allgames, displayed_games]);

  

    const search = () => {

        let array_found_games = Array(allgames.length);
        let position = 0;

        let search_text = RefSearch.current.value;

        if (search_text == "") setFoundGames(null);
        else {

            for (let index = 0; index < allgames.length; index++) {

                if (allgames[index].Game_name.toLowerCase().includes(search_text)) {

                    array_found_games[position] = allgames[index];
                    position++;

                }
                else

                    if (allgames[index].Game_name.includes(search_text)) {

                        array_found_games[position] = allgames[index];
                        position++;

                    }
            }

            setFoundGames(array_found_games);
            console.log(RefSearch.current.value)
        }
    }

    const sorting_games = (ev) => {

        setSortType(ev.target.value);

        let number_games_must_displaying = 12 * current_page_number;

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "Sort_Type": ev.target.value,
                "Selected_Games": number_games_must_displaying
            })
        };



        fetch('http://localhost:56116/api/get_sorted_games_using_range', requestOptions)
            .then(response => response.json())
            .then((responseData) => {

               
                setDisplayedGames(responseData);
             
            });

 }

    const change_page_number = (ev) => {

        setCurrentPageNumber(ev.target.getAttribute('value'));
       

        let number_games_must_displaying = 12 * ev.target.getAttribute('value');

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "Sort_Type": sort_type,
                "Selected_Games": number_games_must_displaying
            })
        };


       
        fetch('http://localhost:56116/api/get_sorted_games_using_range', requestOptions)
            .then(response => response.json())
            .then((responseData) => {

              
                setDisplayedGames(responseData);
               
            });
       
    }

    const redirect_to_purchase = (ev) => {

        redirect.push('/Purchase', { GameName: ev.target.getAttribute('alt') });
    }


    if (foundgames != null)
        return (

            <div >


                <p style={{ color: "white", fontSize: "20px" }}>My Games</p>

                <select onChange={sorting_games} className={style.sort_elements} disabled>

                    <option selected value="Alphabetical">Alphabetical</option>
                    <option value="Newest">Newest</option>
                    <option value="Low to High">Price: Low to High</option>
                    <option value="High to Low">Price: High to Low</option>


                </select>

                <div className={style.searchbar}>

                    <input type="text" ref={RefSearch} onChange={search} placeholder="Search.." style={{ borderRadius: "6px" }} />
                    <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginLeft: "5px" }} />


                </div>

                {foundgames.map(item => {

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
        );

    else

        if (displayed_games != null)
            return (

                <div >
                    <p className={style.text_discover_games}>Discover games</p>



                    <select onChange={sorting_games} className={style.sort_elements} >

                        <option selected value="Alphabetical">Alphabetical</option>
                        <option value="Newest">Newest</option>
                        <option value="Low to High">Price: Low to High</option>
                        <option value="High to Low">Price: High to Low</option>
                       

                    </select>

                    <div className={style.searchbar}>

                        <input type="text" ref={RefSearch} onChange={search} placeholder="Search.." style={{ borderRadius: "6px" }} />
                        <FontAwesomeIcon icon={faMagnifyingGlass} style={{ marginLeft: "5px" }} />


                    </div>

                    {displayed_games.map(item => {

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


                   
                    <Pagination className={style.page_navigation}
                        boundaryRange={5}
                        defaultActivePage={1}

                        firstItem={null}
                        lastItem={null}
                        siblingRange={1}
                        totalPages={total_page_number}

                        onClick={change_page_number}
                    />

                    
                </div>

                
       
        );

    else

        return (
            <div class="spinner-border" role="status" >
                <span class="visually-hidden"></span>
            </div>
            )
}