import React, {useEffect,useState,useRef } from 'react';
import { toaster } from 'evergreen-ui';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';


import GetCookie from '../public_files/GetCookie';
import ScrollTopButton from '../public_files/ScrollTopButton';

import style from './Commentary.module.css';

import user_icon from '../public_files/user_icon.png';
import trash_can from '../public_files/trash_can.png'


export default function GameCommentary(props) {

    const [commentary, setCommentary] = useState(null);
    const [request, setRequest] = useState(true);
    const [commentary_field_status, setCommentaryFieldStatus] = useState('none');

    const [total_number_commentary, setTotalNumberCommentary] = useState(0);
    const [number_displaying_comment, setNumberDisplayingComment] = useState(5);

    const [status_display_button, setStatusDisplayButton] = useState('none');
    const [status_delete_commentary_button, setStatusDeleteCommentaryButton] = useState('none');

    const refComment = useRef("");

    const username = GetCookie('username');

    const url_get_commentary = 'http://localhost:56116/api/get_game_commentary/' + props.game_name + '/' + number_displaying_comment;
    const url_get_number_commentary = 'http://localhost:56116/api/get_number_of_commentary/' + props.game_name;

    useEffect(() => {

        

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

       
        if (request == true) {

            
            fetch(url_get_commentary, requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    if (responseData.length > 0 && responseData != "No commentary for this game") {

                        setCommentary(responseData);

                    }

                    setRequest(false);

                });

           

            fetch(url_get_number_commentary, requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    
                        setTotalNumberCommentary(responseData);

                    if (responseData > 5)
                        setStatusDisplayButton('block');

                   

                });

            

            fetch('http://localhost:56116/api/get_user_role/'+username, requestOptions)
                .then(response => response.json())
                .then((responseData) => {


                    if (responseData == "admin")
                    setStatusDeleteCommentaryButton('block')

                });

        }

        if (GetCookie("status_account") == "online")
            setCommentaryFieldStatus("display");


    }, [commentary]);

  

    const save_comment = () =>{


        let comment = refComment.current.value;
      

        if (comment.length > 0) {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "Username": username,
                    "Commentary": refComment.current.value,
                    "GameName": props.game_name
                })
            };



            fetch('http://localhost:56116/api/add_game_commentary', requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    if (responseData == "Commentary added succesfully") {
                        toaster.success(responseData);
                        
                    }
                    
                });




            setTimeout(() => {

                const requestOptions = {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' }
                };

                fetch(url_get_commentary, requestOptions)
                    .then(response => response.json())
                    .then((responseData) => {

                        if (responseData.length > 0 && responseData != "No commentary for this game")
                            setCommentary(responseData);

                       
                    })

                fetch(url_get_number_commentary, requestOptions)
                    .then(response => response.json())
                    .then((responseData) => {


                        setTotalNumberCommentary(responseData);

                        if (responseData > 5)
                            setStatusDisplayButton('block');



                    });

            }
            ,1000*10)

           
            
        }
        else {
            var element = document.getElementById('wrong_input');
            element.style.display = "block";
        }
    }

    const display_other_comment = () => {

        let number_for_displaying = number_displaying_comment + 5;
        setNumberDisplayingComment(number_displaying_comment + 5);

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('http://localhost:56116/api/get_game_commentary/' + props.game_name + '/' + number_for_displaying, requestOptions)
            .then(response => response.json())
            .then((responseData) => {

                if (responseData.length > 0 && responseData != "No commentary for this game")
                    setCommentary(responseData);

            })

        if (number_displaying_comment >= total_number_commentary) {
            let element = document.getElementById('button_display_other_comment');
            element.style.display = "none";
        }
    }

    const delete_comment = (ev) => {

        let comment_id = ev.target.getAttribute('name');

        var answer = window.confirm('Are you sure you want to delete this commentary?');
        if (answer) {


            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "ModeratorName": username,
                    "Rights_token":GetCookie('rights_token'),
                    "ID": comment_id
                })
            };

            fetch('http://localhost:56116/api/delete_game_commentary', requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    if (responseData == "Commentary deleted succesfully")
                        toaster.success(responseData);

                })

            setTimeout(() => {

            const requestCommentary = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            };

                fetch(url_get_commentary, requestCommentary)
                .then(response => response.json())
                .then((responseData) => {

                    if (responseData.length > 0 && responseData != "No commentary for this game")
                        setCommentary(responseData);

                })
            }
                , 1000 * 10)
        }

    }



    if (commentary != null && commentary_field_status == "none")
        return (



            <div className={style.commentary_div}>

                <p style={{ color: "white" }}>Commentary:</p>

                <div className={ style.warning_commentary}>
                    <p> For write opinion need to  <NavLink className={style.nav_link } tag={Link} to="/SignIn" >log in</NavLink>

                    </p>
                    </div>
                {commentary.map(item => {

                    return (

                        <div className={style.user_commentary}  >


                            <img src={user_icon} className={style.commentary_user_icon} />

                            <p className={style.username_who_comment}>{item.Username}</p>


                            <textarea type="text" class="form-control" value={item.Commentary} id={style.commentary_field} disabled />



                        </div>

                    );
                })}
                <button id="button_display_other_comment" class="btn btn-primary" style={{ display: status_display_button }}
                             onClick={display_other_comment}> Display other </button>

                <ScrollTopButton />

            </div>


        )
    else
    if (commentary != null && commentary_field_status == "display")
        return (

       

            <div className={style.commentary_div}>

                <p style={{ color: "white" }}>Commentary:</p>

                <img src={user_icon} className={style.commentary_user_icon} />


                <textarea type="text" class="form-control" placeholder="Write you opinion"
                    ref={refComment} id={style.commentary_field} />

                <small id="wrong_input" style={{ marginTop:"-10vh",display: "none" }} class="form-text text-muted">Commentary field can not be empty</small>

                <button className={style.button_comment} onClick={save_comment}>
                    <p style={{ color: "white" }}>Comment</p> </button>


                {commentary.map(item => {

                    return (

                        <div className={style.user_commentary }  >


                            <img src={user_icon} className={style.commentary_user_icon} />

                            <p className={ style.username_who_comment}>{item.Username}</p>
                 

                     <textarea type="text" class="form-control" value={item.Commentary} id={style.commentary_field} disabled/>

                            <img src={trash_can} className={style.delete_button} style={{ display: status_delete_commentary_button }}
                                name={item.ID} onClick={delete_comment }/>

                        </div>

                    );
                })}
                <button id="button_display_other_comment" class="btn btn-primary" style={{ display: status_display_button }}
                    onClick={display_other_comment}> Display other </button>

                
                <ScrollTopButton />
            </div>
           
        
        )

    else
        if (commentary_field_status == "display")
    return (

        <div className={style.commentary_div}>
            <p style={{ color: "white" }}>Commentary:</p>

            <img src={user_icon} className={style.commentary_user_icon} />


            <textarea type="text" class="form-control" placeholder="Write you opinion"
                ref={refComment} id={style.commentary_field} />

            <small id="wrong_input" style={{display:"none"} }class="form-text text-muted">Commentary field can not be empty</small>

            <button  className={style.button_comment} onClick={save_comment}>
                                                    <p style={{ color: "white" }}>Comment</p> </button>
           

            <p style={{ color: "white", marginLeft:"50px" }}>No commentary for this game</p>
            </div>
                )

        else
                return (

                    <div className={style.commentary_div}>
                        <p style={{ color: "white" }}>Commentary:</p>

                        <div className={style.warning_commentary}>
                            <p> For write opinion need to  <NavLink className={style.nav_link} tag={Link} to="/SignIn" >log in</NavLink>

                            </p>
                        </div>

                        <p style={{ color: "white", marginLeft: "40px" }}>No commentary for this game</p>
                    </div>
                )
}