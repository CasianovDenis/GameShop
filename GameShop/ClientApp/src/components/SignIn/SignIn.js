import React, {useEffect,useState,useRef , useContext } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import { Context } from '../Context';

import style from './SignIn.module.css';

import sha256 from 'js-sha256';
import GetCookie from '../public_files/GetCookie.js';


export default function SignIn() {
    const redirect = useHistory();

    if (GetCookie("status_account") == "online") redirect.push('/');

    const [message, setMessage] = useState('');
    const [context, setContext] = useContext(Context);

    const refUsername = useRef(""),
        refPassword = useRef("");


    const authentication = (event) => {

        event.preventDefault();

        setMessage('Processing');


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
                       
                        if (responseData.Rights_token != undefined ) {

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

                        else if (responseData != "Password incorrect" && responseData != "User not exist") {

                            refUsername.current.value = "";

                            refPassword.current.value = "";

                            var date = new Date();

                            date.setDate(date.getDate() + 1);


                            document.cookie = "username=" + user.Username + "; expires=" + date.toGMTString();

                            document.cookie = "status_account=online ; expires=" + date.toGMTString();

                            document.cookie = "auth_token=" + responseData + "; expires = " + date.toGMTString();

                           
                            setContext("success_entered");
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


                    <p style={{ color: "white", fontSize: "20px", marginLeft: "40%", marginTop:"20px" }}>Welcome</p>


                    <div className={ style.inputBox}>
                        <input type="text" ref={refUsername} required />
                        <span>Username</span>
                    </div>

                    <div className={ style.inputBox}>
                        <input type="password" ref={refPassword} required />
                        <span>Password</span>
                    </div>

                <NavLink tag={Link}  to="/SignUp">Create Account</NavLink>
                <button className={style.signin_button}  onClick={authentication}> Sign In </button>

                </form>

                <p style={{ color: "white", marginLeft: "25px" }}>{message} </p>

            </div>



        </div>

           
        
        )
}
