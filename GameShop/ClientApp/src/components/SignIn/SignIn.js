import React, {useEffect,useState,useRef } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';


import style from './SignIn.module.css';

import sha256 from 'js-sha256';
import GetCookie from '../public_files/GetCookie.js';


export default function SignIn() {
    const redirect = useHistory();

    if (GetCookie("status_account") == "online") redirect.push('/');

    const [message, setMessage] = useState('');

    const refUsername = useRef(""),
        refPassword = useRef("");


    const authentication = (event) => {

        event.preventDefault();

        setMessage('Processed');


        let user = {

            "Username": refUsername.current.value,
            "Password": sha256(refPassword.current.value)

        }

        if (user.Username.match(/\w/) && user.Username.length <= 30) {


            if (refPassword.current.value != "") {


                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(user)
                };


                fetch('http://localhost:56116/api/user_authentication', requestOptions)
                    .then(response => response.json())
                    .then((responseData) => {

                        if (responseData.Rights_token != "") {

                            refUsername.current.value = "";

                            refPassword.current.value = "";

                            var date = new Date();

                            date.setDate(date.getDate() + 1);


                            document.cookie = "username=" + user.Username + "; expires=" + date.toGMTString();

                            document.cookie = "status_account=online ; expires=" + date.toGMTString();

                            document.cookie = "rights_token=" + responseData.Rights_token + "; expires = " + date.toGMTString();

                            document.cookie = "auth_token=" + responseData.Authorization_token + "; expires = " + date.toGMTString();

                            redirect.go('/');
                        }

                        else {

                            refUsername.current.value = "";

                            refPassword.current.value = "";

                            var date = new Date();

                            date.setDate(date.getDate() + 1);


                            document.cookie = "username=" + user.Username + "; expires=" + date.toGMTString();

                            document.cookie = "status_account=online ; expires=" + date.toGMTString();

                            document.cookie = "auth_token=" + responseData + "; expires = " + date.toGMTString();

                            redirect.go('/');
                        }
                        
                           

                        setMessage(responseData);

                        
                    });

            }
            else
                setMessage(" Password field can not be empty ")
        }
        else
            setMessage("Username field can not be empty")
    }
    




    return (
        

        
        <div className={ style.div_signin}>

            <div className={style.modal_signin}>
                <form>

                <br />
                <p style={{ color: "white", fontSize:"20px", marginLeft: "40%" }}>Welcome</p>

                <p style={{ color: "white", marginLeft: "20px" }}> Username: </p>

                <input class="form-control" ref={refUsername} style={{ width: "90%", marginLeft:"20px" }} type="text" />

                <br />


                <p style={{ color: "white", marginLeft: "20px"}}>Password:</p>

                <input class="form-control" ref={refPassword} style={{ width: "90%", marginLeft: "20px" }} type="password" />

                <NavLink tag={Link}  to="/SignUp">Create Account</NavLink>
                <button className={style.signin_button}  onClick={authentication}> Sign In </button>

                </form>

                <p style={{ color: "white", marginLeft: "25px" }}>{message} </p>

            </div>



        </div>

           
        
        )
}
