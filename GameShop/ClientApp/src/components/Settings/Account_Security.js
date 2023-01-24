import React, { useEffect, useRef, useState } from 'react';
import style from './Settings.module.css';

export default function Account_Security() {

    const refCurrentPassword = useRef(""),
        refNewPassword = useRef(""),
        refConfirmPassword = useRef("");

    return (

       

            <div>




                <div className={style.div_security_settings}>


                    <label style={{ marginTop: "10px", marginLeft: "10px", fontSize: "18px" }}>Security Settings</label>
                    <hr />

                    <form>
                        <p style={{ marginLeft: "10px" }}>Current Password:</p>
                        <input class="form-control" ref={refCurrentPassword} style={{ width: "60%", marginLeft: "10px" }} type="email" />

                        <p style={{ marginLeft: "10px", marginTop: "10px" }}>New Password:</p>
                        <input class="form-control" ref={refNewPassword} style={{ width: "60%", marginLeft: "10px" }} type="email" />

                    <p style={{ marginLeft: "10px", marginTop: "10px" }}>Confirm Password:</p>
                    <input class="form-control" ref={refConfirmPassword} style={{ width: "60%", marginLeft: "10px" }} type="email" />

                        <button class="btn btn-primary" style={{ marginTop: "10px", marginLeft: "10px" }}> Save Change </button>
                    </form >
                </div>


            </div>


       
    )
}