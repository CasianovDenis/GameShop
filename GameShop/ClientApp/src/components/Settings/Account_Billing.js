import React, { useEffect, useRef, useState } from 'react';
import style from './Settings.module.css';
import GetCookie from '../public_files/GetCookie';
import CreditCard from './CreditCard.png';
import { toaster } from 'evergreen-ui';

export default function Account_Billing() {

    const [message, setMessage] = useState("");
    const [exist_card, setExistCard] = useState(null);
    
    const refCardNumber = useRef(""),
        refMonth = useRef(""),
        refYear = useRef("");

    useEffect(() => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                "Username": GetCookie("username")
                
            })
        };


        fetch('http://localhost:56116/api/checking_user_have_credit_card', requestOptions)
            .then(response => response.json())
            .then((responseData) => {

                if (responseData == "Card exist")
                    setExistCard(responseData);
               
                
                


            });

    }, [exist_card]);

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

    const add_credit_card = (ev) =>{
        ev.preventDefault();
        let cardnumber = refCardNumber.current.value,
            expiremonth = refMonth.current.value,
            expireyear = refYear.current.value;

        let date = new Date();

        let current_year = date.getFullYear().toString();
        current_year = current_year.slice(-2);

        let current_month = date.getMonth();

        if (cardnumber.length == 16 || cardnumber.length == 15 ) {

            if (expiremonth.length == 2 && expiremonth >= current_month && expiremonth <= 12) {

                if (expireyear.length == 2 && expireyear > 0 && expireyear >= current_year) {

                    setMessage("Processed");

                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({

                            "Username": GetCookie("username"),
                            "CardNumber": btoa(refCardNumber.current.value),
                            "ExpireMonth": btoa(refMonth.current.value),
                            "ExpireYear": btoa(refYear.current.value)

                        })
                    };


                    fetch('http://localhost:56116/api/add_user_credit_card', requestOptions)
                        .then(response => response.json())
                        .then((responseData) => {

                            if (responseData == "Credit card was added successfully") {

                                refCardNumber.current.value = "";
                                refMonth.current.value = "";
                                refYear.current.value = "";

                                setMessage("");

                                toaster.success('Credit card was added successfully');
                                setExistCard(responseData);

                            }
                            else
                            setMessage(responseData);


                        });
                }
                else
                    setMessage("Incorrect year")
            }
            else
                setMessage("Incorrect month")
        }
        else
            setMessage("Incorrect card number")
    }

    const delete_credit_card = () => {

        var answer = window.confirm("You want to delete credit card from account?");

        if (answer) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({

                    "Username": GetCookie("username")
                    
                })
            };


            fetch('http://localhost:56116/api/delete_user_credit_card', requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    if (responseData == "Card deleted") {

                        toaster.success('Credit card was deleted successfully');
                        setExistCard(null);

                    }


                });

            
        }
        
    }

    if (exist_card==null)
    return (

        <div>




            <div className={style.div_billing_settings}>


                <label style={{ marginTop: "10px", marginLeft: "10px", fontSize: "18px" }}>Billing Settings</label>
                <hr />

                <form >
                <p style={{ marginLeft: "10px" }}> Card Number:</p>
                <input type="text" ref={refCardNumber} class="form-control" maxlength="16"
                    onChange={input_number} required style={{ width: "60%", marginLeft: "10px" }}/>

                <p style={{marginTop:"10px", marginLeft: "10px" }}>Expire Date:</p>

                <input type="text" ref={refMonth} class="form-control" maxlength="2" 
                    onChange={input_expdate} required placeholder="mm" style={{ width: "15%", marginLeft: "10px" }}/>

                    <input type="text" ref={refYear} class="form-control" maxlength="2" id={style.expire_year }
                    onChange={input_expdate} required placeholder="yy" />

                    <button class="btn btn-primary" style={{ marginLeft: "10px", marginTop: "-10px" }}
                        onClick={add_credit_card}> Add card</button>

                    <p style={{ marginTop: "10px", marginLeft: "10px" }}> {message} </p>
                    </form>
              
            </div>


        </div>
    )
    else
    return (

        <div>




            <div className={style.div_billing_settings}>


                <label style={{ marginTop: "10px", marginLeft: "10px", fontSize: "18px" }}>Billing Settings</label>
                <hr />

                <div>
                    <img src={CreditCard} style={{ width: "100px", height: "100px" }} />
                    <p style={{marginTop:"-70px",marginLeft:"100px"} }>You already added credit card</p>
                    </div>
                   
                <button class="btn btn-danger" style={{ marginLeft: "10px", marginTop: "50px" }}
                    onClick={delete_credit_card}> Delete card</button>

                   
              

            </div>


        </div>
    )

}