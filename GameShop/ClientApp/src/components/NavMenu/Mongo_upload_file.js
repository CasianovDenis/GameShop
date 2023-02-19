import React, { useState, useRef } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import GetCookie from '../public_files/GetCookie';


import axios from 'axios';


export default function Mongo_upload_file() {

    const [message, setMessage] = useState('');


    const refGameName = useRef(""),
        refVideoUrl = useRef("");

    const [file, setFile] = useState();
    
    const [show_submit_video, setShowSubmitVideo] = useState(false);
    const [show_submit_image, setShowSubmitImage] = useState(false);


    const savefile = (ev) => {
       
        setFile(ev.target.files[0]);
      

        setShowSubmitImage(true);
        setShowSubmitVideo(false);

    }
    
    const upload_image = () => {

        let gamename = refGameName.current.value;

        if (gamename.length > 0) {

            if (file.type == "image/jpeg" || file.type == "image/png" || file.type == "image/webp" || file.type == "image/svg") {

                setMessage("Processing");

                const filedata = new FormData();
                filedata.append("File", file);
                filedata.append("VideoUrl", "");
                filedata.append("GameName", gamename);
                filedata.append("ModeratorName", GetCookie('username'));
                filedata.append("Rights_token", GetCookie('rights_token'));


                const result = axios.post("http://localhost:56116/api/upload_image", filedata,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );
                result.then((response) => { setMessage(response.data); })
            }
            else
                setMessage("Only image permitted upload");
        }
        else
            setMessage("Game Name can not be empty");

    }

    const save_video_url = () => {


        if (refVideoUrl.current.value.match(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/))
            setShowSubmitVideo(true);

        setShowSubmitImage(false);

    }

    const upload_video_url = () => {

        let gamename = refGameName.current.value;

        if (gamename.length > 0) {

            setMessage("Processing");

            const requestOptions = {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({

                    "File": "",
                    "GameName": gamename,
                    "ModeratorName": GetCookie('username'),
                    "Rights_token": GetCookie('rights_token'),
                    "VideoUrl": refVideoUrl.current.value
                })
            };




            fetch('http://localhost:56116/api/upload_video_url', requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    setMessage(responseData);

                });
        }
        else
            setMessage("Game Name can not be empty");
    }


    const select_upload_type = (ev) => {
        let option = ev.target.value;

        if (option == "image") {
            let element = document.getElementById('upload_image');
            element.style.display = "block";

            element = document.getElementById('upload_video_url');
            element.style.display = "none";

        }
        else {
            let element = document.getElementById('upload_image');
            element.style.display = "none";

            element = document.getElementById('upload_video_url');
            element.style.display = "block";
        }
    }
    
    return (

       
        <div>
            <p  id="upload_gameimage_button"  data-toggle="modal" data-target="#upload_file">Upload game data</p>
            
            <div class="modal fade" id="upload_file" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">

            <div class="modal-content">
                <div class="modal-header">
                   <h5 class="modal-title" id="exampleModalLabel">Upload modal</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                        </div>

                            <div class="modal-body">
                            <p> Select data type what you want upload</p>

                            <select onChange={select_upload_type}>
                                <option > Select </option>
                                <option value="image"> Image </option>
                                <option value="video"> Video </option>
                            </select>


                            <div style={{ display: "none" }} id="upload_video_url">

                                <p> Video URL:</p>
                                <p> url for youtube must contain "embed" for example "https://www.youtube.com/embed/UAO2urG23S4"</p>
                                <input type="text" ref={refVideoUrl} class="form-control" style={{ width: "60%" }} required onChange={save_video_url} />
                            </div>

                            <div style={{display:"none"} } id="upload_image">
                      <p>Image inserted in this field will display in the purchase page</p>

                     <input type="file" name="name" onChange={savefile} style={{ margin: "10px" }}/>
        

                        </div>

                        <div>

                            </div>

                        <p> Game Name:</p>
                        <input type="text" ref={refGameName} class="form-control" style={{ width: "60%" }} required />

                            <p style={{ marginLeft: "5px" }}>{message}</p>
                            </div>
                        <div class="modal-footer">

                            {show_submit_image && (
                            <button style={{ margin: "10px" }}
                                type="button"  class="btn btn-primary" onClick={upload_image}>Upload</button>
                            )}

                            {show_submit_video && (
                            <button style={{ margin: "10px" }}
                                type="button"  class="btn btn-primary" onClick={upload_video_url}>Upload</button>
                            )}

                            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                   
                </div>
            </div>
        </div>
    </div>
           
</div>
        
    );



}




