import React, { useEffect, useRef, useState } from 'react';
import style from './Settings.module.css';

export default function Account_Settings() {

    const refCurrentEmail = useRef(""),
        refNewEmail = useRef("");

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

                    <button class="btn btn-primary"  style={{ marginTop: "10px", marginLeft: "10px" }}> Save Change </button>
                </form >
                        </div>


        </div>
    )
}