import React, { useEffect, useRef, useState } from 'react';

import GetCookie from '../public_files/GetCookie';
import sha256 from 'js-sha256';

import style from './Settings.module.css';

export default function Account_Security() {

    const [message, setMessage] = useState("");

    const refCurrentPassword = useRef(""),
        refNewPassword = useRef(""),
        refConfirmPassword = useRef("");

    const change_password = (ev) => {

        ev.preventDefault();

        if (refCurrentPassword.current.value != refNewPassword.current.value) {

            if (refConfirmPassword.current.value == refNewPassword.current.value) {

                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({

                        "Username": GetCookie("username"),
                        "Password": sha256(refCurrentPassword.current.value),
                        "NewPassword": sha256(refNewPassword.current.value)

                    })
                };


                fetch('http://localhost:56116/api/update_user_password', requestOptions)
                    .then(response => response.json())
                    .then((responseData) => {

                        if (responseData == "Password change successfuly") {

                            refCurrentPassword.current.value = "";
                            refNewPassword.current.value = "";
                            refConfirmPassword.current.value = "";

                        }

                        setMessage(responseData);


                    });
            }
            else
                setMessage("New password don't match confirm password")
        }
        else
            setMessage("New password match current");
    }
    return (

       

            <div>


                <div className={style.div_security_settings}>


                    <label style={{ marginTop: "10px", marginLeft: "10px", fontSize: "18px" }}>Security Settings</label>
                    <hr />

                    <form>
                        <p style={{ marginLeft: "10px" }}>Current Password:</p>
                        <input class="form-control" ref={refCurrentPassword} style={{ width: "60%", marginLeft: "10px" }} type="password" />

                        <p style={{ marginLeft: "10px", marginTop: "10px" }}>New Password:</p>
                    <input class="form-control" ref={refNewPassword} style={{ width: "60%", marginLeft: "10px" }} type="password" />

                    <p style={{ marginLeft: "10px", marginTop: "10px" }}>Confirm Password:</p>
                    <input class="form-control" ref={refConfirmPassword} style={{ width: "60%", marginLeft: "10px" }} type="password" />

                    <button class="btn btn-primary" style={{ marginTop: "10px", marginLeft: "10px" }}
                                                                    onClick={change_password} > Save Change </button>
                </form >

                 
            <p style={{ marginTop: "10px", marginLeft: "10px" }}> {message} </p>
                </div>


            </div>


       
    )
}