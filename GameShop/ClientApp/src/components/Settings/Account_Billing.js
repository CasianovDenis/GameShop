import React, { useEffect, useRef, useState } from 'react';
import style from './Settings.module.css';


export default function Account_Billing() {

    const refCardNumber = useRef(""),
        refMonth = useRef(""),
        refYear = useRef("");

    const input_number = () => {

        let string = refCardNumber.current.value;

        refCardNumber.current.value = string.replace(/[a-zA-Z!@#\$%\^\&*\)\(+=.,_-]/, '');

    }

    const input_expdate = () => {

        let month = refMonth.current.value;
        let year = refYear.current.value;


        refMonth.current.value = month.replace(/[a-zA-Z!@#\$%\^\&*\)\(+=.,_-]/, '');
        refYear.current.value = year.replace(/[a-zA-Z!@#\$%\^\&*\)\(+=.,_-]/, '');

    }


    return (

        <div>




            <div className={style.div_billing_settings}>


                <label style={{ marginTop: "10px", marginLeft: "10px", fontSize: "18px" }}>Billing Settings</label>
                <hr />

                <form>
                <p style={{ marginLeft: "10px" }}> Card Number:</p>
                <input type="text" ref={refCardNumber} class="form-control" maxlength="16"
                    onChange={input_number} required style={{ width: "60%", marginLeft: "10px" }}/>

                <p style={{marginTop:"10px", marginLeft: "10px" }}>Expire Date:</p>

                <input type="text" ref={refMonth} class="form-control" maxlength="2" 
                    onChange={input_expdate} required placeholder="mm" style={{ width: "15%", marginLeft: "10px" }}/>

                <input type="text" ref={refYear} class="form-control" maxlength="2" 
                    onChange={input_expdate} required placeholder="yy" style={{ width: "15%",marginTop:"-6%", marginLeft: "20%" }}/>

                    <button class="btn btn-primary" style={{ marginLeft:"10px",marginTop:"10px" }}> Add card</button>
                    </form>
              
            </div>


        </div>
    )
}