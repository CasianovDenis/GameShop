import React, { useState, useRef } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import axios from 'axios';


export default function Mongo_upload_file() {

    const [message, setMessage] = useState('');


    const refGameName = useRef("");
    const [file, setFile] = useState();
   

    const savefile = (ev) => {
       
        setFile(ev.target.files[0]);

        var element = document.getElementById("upload_button");
        element.style.display = "block";

    }
    
    const upload = () => {


        const filedata = new FormData();
        filedata.append("FileData", file);
       
          
             const result = axios.post("http://localhost:56116/api/upload_file", filedata);
            //result.then((response) => {
            //    setMessage(response.data);
                
            //});

        var element = document.getElementById('upload_input');

        element.style.display = "none";

        element = document.getElementById('game_input');

        element.style.display = "block";

    }

    const finish_upload = () =>{


        if (refGameName.current.value.match(/^[A-Za-z0-9\s+:]+$/)) {

            setMessage('Processed');
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "OldFileName": file.name,
                    "NewFileName": refGameName.current.value


                })
            };



            //call api from backend and send json data,which create before

            fetch('http://localhost:56116/api/new_file_name', requestOptions)
                .then(response => response.json())
                .then((responseData) => {


                    if (responseData = "File added succesfully") {

                        setMessage(responseData);

                        var element = document.getElementById('upload_input');

                        element.style.display = "block";

                        element = document.getElementById('game_input');

                        element.style.display = "none";

                        setFile();

                        refGameName.current.value = "";

                    }

                });

        }
        else
            setMessage("Wrong name of game")
    }
    
    return (

       
    <div>
        <button class="btn btn-primary" data-toggle="modal" data-target="#upload_file">Upload</button >
            
            <div class="modal fade" id="upload_file" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                   <h5 class="modal-title" id="exampleModalLabel">Add Game</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
               </div>
                <div class="modal-body">
                      <p>In this modal you need to insert image from game,which display in the purchase page</p>

                            <div id="upload_input">

                                <input type="file" name="name" onChange={savefile} />

                                <br />
                                <br />

                     <button style={{ display: "none" }}
                             type="button" id="upload_button" class="btn btn-primary" onClick={upload}>Next step</button>

                            </div>

                            <div id="game_input" style={{ display: "none" }}>

                    <p> Game Name:</p>
                    <input type="text" ref={refGameName} class="form-control" style={{ width: "60%" }} required />

                                <br />

                    <button type="button" class="btn btn-primary" onClick={finish_upload}>Save</button>

                            </div>

                            

                </div>
                <p style={{ marginLeft: "5px" }}>{message}</p>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                   
                </div>
            </div>
        </div>
    </div>
           
</div>
        
    );



}




