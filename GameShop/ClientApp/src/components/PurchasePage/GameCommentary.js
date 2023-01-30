import React, {useEffect,useState,useRef } from 'react';
import style from './Commentary.module.css';
import user_icon from '../public_files/user_icon.png';
import GetCookie from '../public_files/GetCookie';
import { toaster } from 'evergreen-ui';
import {NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function GameCommentary(props) {
    
    const [commentary, setCommentary] = useState(null);
    const [request, setRequest] = useState(true);
    const [commentary_field_status, setCommentaryFieldStatus] = useState('none');

    const refComment = useRef("");

    useEffect(() => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                "GameName": props.game_name
            })
        };

       
        if (request == true)
           
            fetch('http://localhost:56116/api/get_game_commentary', requestOptions)
            .then(response => response.json())
            .then((responseData) => {

                if (responseData.length > 0 && responseData != "No commentary for this game")
                setCommentary(responseData);

                console.log(responseData);
                setRequest(false);

            });

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
                    "Username": GetCookie('username'),
                    "Commentary": refComment.current.value,
                    "GameName": props.game_name
                })
            };



            fetch('http://localhost:56116/api/add_game_commentary', requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    toaster.success(responseData);
                    setRequest(true);
                });
        }
        else {
            var element = document.getElementById('wrong_input');
            element.style.display = "block";
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



                        </div>

                    );
                })}
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
           

            <p style={{ color: "white", marginLeft:"50px" }}>Not commentary for this game</p>
            </div>
                )

        else
                return (

                    <div className={style.commentary_div}>
                        <p style={{ color: "white" }}>Commentary:</p>

                        <p style={{ color: "white", marginLeft: "50px" }}>Not commentary for this game</p>
                    </div>
                )
}