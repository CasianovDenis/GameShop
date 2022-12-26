import React, { useState, useRef } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';



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

            "Game_name": refGameName.current.value,
            "Price": refPrice.current.value,
            "Description": refDescription.current.value,
            "Cover": refCover.current.value,
            "Currency": "$"

        };

        //Game_name must contains letters,numbers,2 symbols ", ." 
        if (newgame.Game_name.match(/^[A-Za-z0-9\s+:]+$/)) {

            //Verified if Price have a number and Price is normal
            if (newgame.Price.match(/\d+$/) && newgame.Price<=70 && newgame.Price>0) {

                //Description must 40+ letters
                if (newgame.Description.match(/\w/) && letters_number>=40) {

                    //Cover must contains url image
                    if (newgame.Cover.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/)) {

                        setMessage('Processed');

                       
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(newgame)
                        };



                        //call api from backend and send json data,which create before

                        fetch('http://localhost:56116/api/upload_data', requestOptions)
                            .then(response => response.json())
                            .then((responseData) => {



                                setMessage(responseData);

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
        else
        setMessage("Name of game wrong,only letters,numbers");
    }

    

    return (

       
    <div>
        <button class="btn btn-primary" data-toggle="modal" data-target="#add_game">Add game</button >
            
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
                     <input type="text" ref={refGameName} class="form-control"  required />

                            <p>Price:</p>
                                <input type="number" ref={refPrice} class="form-control" required/>

                            <p>Description:</p>
                            <textarea ref={refDescription} rows="10" cols="50" onChange={count_letters} required />

                            <p>Letters:{letters_number}</p>

                            <p>Insert Image URL:</p>
                            <input type="text" ref={refCover} class="form-control" required />
                        
                         
                            
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




