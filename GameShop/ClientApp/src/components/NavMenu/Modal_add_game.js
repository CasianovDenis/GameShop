import React, { useState, useRef } from 'react';

import GetCookie from '../public_files/GetCookie';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import style from './NavMenu.module.css';


export default function Modal_add_game() {

    const [message, setMessage] = useState('');
    const [letters_number, setLettersNumber] = useState(0);

    const refGameName = useRef(""),
        refPrice = useRef(""),
    refDescription = useRef(""),
        refCover= useRef("");

    const count_letters = () => {

        let count = 0;
       
        for (let index = 0; index < refDescription.current.value.length; index++)
            if (refDescription.current.value[index].match(/\s/g)) count++;

        setLettersNumber(count);

        
    }


    const upload_data = () =>{

        let newgame = {
            "ModeratorName": GetCookie("username"),
            "Rights_token":GetCookie("rights_token"),
            "Game_name": refGameName.current.value,
            "Price": refPrice.current.value,
            "Description": refDescription.current.value,
            "Cover": refCover.current.value,
            "Currency": "$"

        };

       

            
            if (newgame.Price.match(/\d+$/) && newgame.Price<=70 && newgame.Price>0) {

                
                if ( letters_number>=40) {

                    //Verifie if in cover is inserted url
                    if (newgame.Cover.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) {

                        setMessage('Processed');

                       
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(newgame)
                        };



                       
                        fetch('http://localhost:56116/api/add_game_in_db', requestOptions)
                            .then(response => response.json())
                            .then((responseData) => {


                                if (responseData == "Succes") {
                            

                                    refGameName.current.value = "";
                                    refCover.current.value = "";
                                    refDescription.current.value = "";
                                    refPrice.current.value = "";

                                    setMessage("Game was added");
                                }

                            });
                    }
                    else
                        setMessage("Url inserted is wrong");
                }
                else
                    setMessage("Description wrong,need 40+ letters");
            }
            else
            setMessage("Price wrong, insert number with 1 to 70");
        
    }

    

    return (

       
        <div >
            <div className={style.nav_button}>
            <p data-toggle="modal" data-target="#add_game">Add game</p>
            <i></i>
            </div>

            <div class="modal fade" id="add_game" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                   <h5 class="modal-title" id="exampleModalLabel">Add Game</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
               </div>
                <div class="modal-body">

                           
                     <p> Game Name:</p>
                     <input id="gamename" type="text" ref={refGameName} class="form-control"  required />

                            <p>Price:</p>
                                <input id="price" type="number" ref={refPrice} class="form-control" required/>

                            <p>Description:</p>
                            <textarea id="description" style={{width:"100%"}} ref={refDescription} rows="10" cols="50" onChange={count_letters} required />

                            <p>Letters:{letters_number}</p>

                            <p>Insert Image URL:</p>
                            <input id="imgurl" type="text" ref={refCover} class="form-control" required />
                        
                         
                            
                </div>
                <p style={{ marginLeft: "5px" }}>{message}</p>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" onClick={upload_data}>Save</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                   
                </div>
            </div>
        </div>
    </div>
           
</div>
        
    );



}




