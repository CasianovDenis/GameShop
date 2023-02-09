import React, { useState, useRef } from 'react';
import {NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import GetCookie from '../public_files/GetCookie';


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

        let gamename = refGameName.current.value;

        if (gamename.length > 0) {

            const filedata = new FormData();
            filedata.append("File", file);
            filedata.append("GameName", gamename);
            filedata.append("ModeratorName", GetCookie('username'));
            filedata.append("Rights_token", GetCookie('rights_token'));


            const result = axios.post("http://localhost:56116/api/upload_file", filedata,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
              result.then((response) => { setMessage(response.data); })
        }
        else
            setMessage("Game Name can not be empty");



    }

    
    return (

       
        <div>
            <p  id="upload_gameimage_button"  data-toggle="modal" data-target="#upload_file">Upload image for game</p>
            
            <div class="modal fade" id="upload_file" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">

            <div class="modal-content">
                <div class="modal-header">
                   <h5 class="modal-title" id="exampleModalLabel">Upload image for game</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                        </div>

                <div class="modal-body">
                      <p>In this modal you need to insert image from game,which display in the purchase page</p>

                         

                                <input type="file" name="name" onChange={savefile} style={{ margin: "10px" }}/>
        

                    <p> Game Name:</p>
                    <input type="text" ref={refGameName} class="form-control" style={{ width: "60%" }} required />

                            

                        </div>



                <p style={{ marginLeft: "5px" }}>{message}</p>
                        <div class="modal-footer">

                            <button style={{ display: "none", margin: "10px" }}
                                type="button" id="upload_button" class="btn btn-primary" onClick={upload}>Upload</button>
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                   
                </div>
            </div>
        </div>
    </div>
           
</div>
        
    );



}




