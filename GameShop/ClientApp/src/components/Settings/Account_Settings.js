import React, { useEffect, useRef, useState } from 'react';
import style from './Settings.module.css';
import GetCookie from '../public_files/GetCookie';

export default function Account_Settings() {

    const [message, setMessage] = useState("");

    const refCurrentEmail = useRef(""),
        refNewEmail = useRef("");


    const change_email = (ev) => {

        ev.preventDefault();

        let update_email = {
            "Username":GetCookie("username"),
            "Email": refCurrentEmail.current.value,
            "NewEmail": refNewEmail.current.value
        }
        if (update_email.Email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )) {

            if (update_email.NewEmail.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )) {

                if (update_email.Email != update_email.NewEmail) {
                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(update_email)
                    };


                    fetch('http://localhost:56116/api/update_user_email', requestOptions)
                        .then(response => response.json())
                        .then((responseData) => {

                            if (responseData == "Email was changed successfully") {

                                refCurrentEmail.current.value = "";
                                refNewEmail.current.value = "";

                            }

                            setMessage(responseData);


                        });
                }
                else
                    setMessage("Current email match new email");
            }
            else
                setMessage("New email have incorrect form")
        }
        else
            setMessage("Current email have incorrect form");
    }


    return (




        <div>


            <div className={style.div_account_settings}>


                <label style={{ marginTop: "10px", marginLeft:"10px",fontSize:"18px" }}>Account Settings</label>
                <hr />

                <form>
                    <p style={{ marginLeft: "10px" }}>Current Email:</p>
                    <input class="form-control" ref={refCurrentEmail} style={{ width: "60%", marginLeft:"10px" }} type="email" />

                    <p style={{ marginLeft: "10px",marginTop: "10px" }}>New Email:</p>
                    <input class="form-control" ref={refNewEmail} style={{ width: "60%", marginLeft: "10px" }} type="email" />

                    <button class="btn btn-primary" style={{ marginTop: "10px", marginLeft: "10px" }}
                                                            onClick={change_email} > Save Change </button>
                </form >
                <p style={{ marginTop: "10px", marginLeft:"10px" }}> {message} </p>
                        </div>


        </div>
    )
}