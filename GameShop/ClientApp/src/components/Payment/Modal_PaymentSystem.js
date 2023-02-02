import React from "react";
import DropIn from "braintree-web-drop-in-react";


import style from "./Payment.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import GetCookie from '../public_files/GetCookie.js';


export default class Modal_PaymentSystem extends React.Component {
    instance;

    state = {
        clientToken: null,
        message: "",
        customer_style: "block",
        pay_card_style: "none"
    };

    async componentDidMount() {
        // Get a client token for authorization from  server

        if (GetCookie("status_account") == "online") {


            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };





            fetch('http://localhost:56116/api/client_token', requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    var clientToken = responseData.toString();

                    this.setState({
                        clientToken,
                        customer_style: "none",
                        pay_card_style: "block"
                    });



                });



        }
        else {

            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };





            fetch('http://localhost:56116/api/client_token', requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    var clientToken = responseData.toString();

                    this.setState({
                        clientToken
                    });


                })

          }
    }


    buy = () => {
        // Send the nonce to server

        const nonce = this.instance.requestPaymentMethod();
       

        nonce.then((value) => { if (value.type == "CreditCard")  
            if (GetCookie("status_account") == "online") {

                if (GetCookie("username") != "" || GetCookie("username") != null) {



                    const requestOptions = {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({

                            "Game_name": this.props.game.Game_name,
                            "Nonce": nonce.toString(),
                            "FirstName": GetCookie("username"),
                            "LastName": "null",
                            "Price": this.props.game.Price,
                            "Email": "null"

                        })
                    };




                    fetch('http://localhost:56116/api/user_buying_game', requestOptions)
                        .then(response => response.json())
                        .then((responseData) => {

                            if (responseData == "Succes")
                                this.setState({
                                    pay_card_style: "none",
                                    message: "game added in the account"
                                });


                        });
                }
            }

            else {


                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({

                        "Game_name": this.props.game.Game_name,
                        "Nonce": nonce.toString(),
                        "FirstName": this.refs.first_name.value,
                        "LastName": this.refs.last_name.value,
                        "Price": this.props.game.Price,
                        "Email": this.refs.email.value

                    })
                };


                fetch('http://localhost:56116/api/guest_buying_game', requestOptions)
                    .then(response => response.json())
                    .then((responseData) => {

                        this.setState({ message: "Game code sending in you email" });


                    });

            }
       
        })
        
        
    }

    customer = ()=> {

        if (this.refs.first_name.value.match(/^[A-Za-z0-9\s]+$/)) {

            if (this.refs.last_name.value.match(/^[A-Za-z0-9\s]+$/)) {

                //Verified if in email field is inserted email format right
                if (this.refs.email.value.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {

                    var div = document.getElementById('customer');
                    div.style.display = "none";
                    div = document.getElementById('pay_card');
                    div.style.display = "block";

                    this.setState({
                        message: ""

                    });
                }
                else
                    this.setState({
                        message: "Email wrong"

                    });
            }
            else
                this.setState({
                    message: "Last name wrong"

                });
        }
        else
            this.setState({
                message:"First name wrong"

            });

    }

    back = () => {

        if (GetCookie("status_account") == "online") {

            let element = document.getElementById('test');
            console.log(test);

            var back_button = document.getElementById('back_button');
            back_button.style.display = "none";
          

        }

        else {

            var div = document.getElementById('customer');
            div.style.display = "block";

            div = document.getElementById('pay_card');
            div.style.display = "none";
        }

    }

    render() {

        if (!this.state.clientToken) {
            return (

                <div>
                    <h1>Loading...</h1>
                </div>

            );
        }

        else
        {

            return (
                <div>
                    <button className={style.BuyButton} data-toggle="modal" data-target="#Payment">Buy Now </button>
      
            
            <div class="modal fade" id="Payment" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                   <h5 class="modal-title" id="exampleModalLabel">Purchase Game</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
               </div>
                <div class="modal-body">
                                   
                        <div className="PaymentCard">
                               
                                        <img class='mx-auto pic' src={this.props.game.Cover} />

                                      <div class="card-title  ">
                                            <p>Game of Name : {this.props.game.Game_name}</p>
                                           
                                            <p>Price : {this.props.game.Price} $</p>
                                           </div>


                                        <div id="customer" style={{ display: this.state.customer_style }}>
                                   <p>First Name:</p>
                                <input type="text" class="form-control" ref="first_name" />

                                            <br />
                                  <p>Last Name:</p>
                                 <input class="form-control" type="text" ref="last_name" />

                                            <br />

                                 <p>Email:</p>
                                  <input class="form-control" type="email" ref="email" />

                                            <br />

                                 <button class="btn btn-primary" onClick={this.customer}> Next </button>
                                    </div>


                                        <div id="pay_card" style={{ display: this.state.pay_card_style }}>

                                            <DropIn 
                                                options={{ authorization: this.state.clientToken }}
                                      onInstance={(instance) => (this.instance = instance)}
                                            />
                                       
                                        <button class="btn btn-primary" onClick={this.buy.bind(this)}>Buy</button>

                                            <button class="btn btn-primary" id="back_button" onClick={this.back} style={{ margin:"10px" }}> Back </button>
                                      </div>

                                        <p style={{ color: "red" }}>{this.state.message}</p>

                                    </div>

                           
                     </div>
                        
            </div>
        </div>
    </div>
           
</div>

               
            );
        }
    }
}

       
    
