import React, {useEffect,useState,useRef } from 'react';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import style from './SignUp.module.css';

import sha256 from 'js-sha256';
import GetCookie from '../public_files/GetCookie.js';

export default function SignUp() {
    const redirect = useHistory();

    if (GetCookie("status_account") == "online") redirect.push('/'); 

    const [message, setMessage] = useState('');

    const refUsername = useRef(""),
        refEmail = useRef(""),
        refPassword = useRef(""),
        refVerificationPassword = useRef("");


    const create_account = (event) => {

        event.preventDefault();

        setMessage('Processing');

        
        let newuser = {

            "Username": refUsername.current.value,
            "Email": refEmail.current.value,
            "Password": sha256(refPassword.current.value),
            "Role": "user",
            "Rights_token":"no_token"

        }

        if (newuser.Username.match(/\w/) && newuser.Username.length <= 30) {

            if (newuser.Email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {

                if (refPassword.current.value != "" && refVerificationPassword.current.value != "") {

                    if (refPassword.current.value == refVerificationPassword.current.value) {



                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(newuser)
                        };


                        fetch('http://localhost:56116/api/create_user', requestOptions)
                            .then(response => response.json())
                            .then((responseData) => {

                                if (responseData == "Account created successfully") {

                                    refUsername.current.value = "";
                                    refEmail.current.value = "";
                                    refPassword.current.value = "";
                                    refVerificationPassword.current.value = "";

                                }

                                setMessage(responseData);


                            });

                    }
                    else
                        setMessage(" Password don't meet verification password ")
                }
                else
                    setMessage("Fields for password can not be empty")
            }
            else
                setMessage("Email isn't correct")
            }
        else
            setMessage("Username is wrong")
    }
    

    return (
        

        
        <div className={style.div_signup }>


            <div className={style.modal_signup}>
                <form>

                   

                    <p style={{ color: "white", fontSize: "20px", marginLeft: "30%", marginTop:"10px" }}>Create an account</p>

              
                    <div className={style.inputBox}>
                <input  ref={refUsername}  type="text" required/>
                        <span>Username</span>
                    </div>
               

              
                    <div className={style.inputBox}>
                    <input ref={refEmail}  type="email" required/>
                        <span>Email</span>
                   </div>

             

                    <div className={style.inputBox}>
                     <input  ref={refPassword} type="password" required/>
                        <span>Password</span>
                     </div>

            
                    <div className={ style.inputBox}>
                        <input ref={refVerificationPassword} type="password" required />
                        <span>Verification pass</span>
                         </div>

                    <NavLink tag={Link} to="/SignIn">Have an account</NavLink>

                    <button className={style.signup_button} onClick={create_account}> Sign Up </button>

                </form>

                <p style={{ color: "white", marginLeft: "25px" }}>{message} </p>


            </div>



        </div>

           
        
        )
}
