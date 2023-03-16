import React, {useEffect,useState,useRef } from 'react';
import { toaster } from 'evergreen-ui';
import { NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';


import GetCookie from '../public_files/GetCookie';
import ScrollTopButton from '../public_files/ScrollTopButton';

import style from './Commentary.module.css';

import user_icon from '../public_files/user_icon.png';
import trash_can from '../public_files/trash_can.png';
import edit_icon from '../public_files/edit_icon.png';
import save_comment_icon from '../public_files/save_comment_icon.png';



export default function GameCommentary(props) {

    const [commentary, setCommentary] = useState(null);
    const [request, setRequest] = useState(false);
    const [commentary_field_status, setCommentaryFieldStatus] = useState('none');

    const [total_number_commentary, setTotalNumberCommentary] = useState(0);
    const [number_displaying_comment, setNumberDisplayingComment] = useState(5);

    const [status_display_button, setStatusDisplayButton] = useState('none');
    const [status_delete_commentary_button, setStatusDeleteCommentaryButton] = useState('none');

    const [new_textarea_text, setNewTextareaText] = useState("");

    const refComment = useRef("");

    const username = GetCookie('username');

    const url_get_commentary = 'http://localhost:56116/api/get_game_commentary/' + props.game_name + '/' + number_displaying_comment;

    useEffect(() => {

        

        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        };

       
     

            
            fetch(url_get_commentary, requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    if (responseData.length > 0 && responseData != "No commentary for this game") {

                        setCommentary(responseData);

                    }


                });

           

        fetch('http://localhost:56116/api/get_number_of_commentary/' + props.game_name, requestOptions)
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


        if (GetCookie("status_account") == "online")
            setCommentaryFieldStatus("display");


    }, [request]);

  

    const add_comment = () =>{


        let comment = refComment.current.value;
      

        if (comment.length > 0) {

            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "Username": username,
                    "Commentary": refComment.current.value,
                    "GameName": props.game_name,
                    "AuthorizationToken":GetCookie("auth_token")
                })
            };



            fetch('http://localhost:56116/api/add_game_commentary', requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    if (responseData == "Commentary added succesfully") {
                        toaster.success(responseData);
                        request == false ? setRequest(true) : setRequest(false)

                        refComment.current.value = "";
                    }
                    
                });

            
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

                    if (responseData == "Commentary deleted succesfully") {
                        request==false ? setRequest(true) : setRequest(false)
                        toaster.success(responseData);
                    }

                })

          
        }

    }

    const update_textarea = (ev) => {

        var id = ev.target.getAttribute('name');

       
        let value_from_textarea = document.getElementById('textarea' + id).value;
        document.getElementById('edit_textarea' + id).value = value_from_textarea;


        let element = document.getElementById("user_comment"+id);
        element.style.display = "none";

        element = document.getElementById("edit_user_comment" + id);
        element.style.display = "block";
       
     

    }

    const update_textarea_text = (event) => {
        setNewTextareaText(event.target.value);
       
    }

    const save_updated_comment = (ev) => {

        let comment_id = ev.target.getAttribute('name');

        var answer = window.confirm('Are you sure you want to edit this commentary?');

        if (answer) {

            let element = document.getElementById("user_comment" + comment_id);
            element.style.display = "block";

            element = document.getElementById("edit_user_comment" + comment_id);
            element.style.display = "none";

            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "Username": username,
                    "Commentary": new_textarea_text,
                    "ID": comment_id,
                    "AuthorizationToken": GetCookie("auth_token")
                })
            };

            fetch('http://localhost:56116/api/update_user_comment', requestOptions)
                .then(response => response.json())
                .then((responseData) => {

                    if (responseData == "Commentary edited successfully") {
                        request == false ? setRequest(true) : setRequest(false)
                        toaster.success(responseData);
                        console.log("work?")
                    }

                })

           
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

                            <p style={{ color: "white" }} className={style.commentary_username}>{item.Username}</p>


                            <textarea type="text" className={style.commentary_field} value={item.Commentary} readOnly />



                        </div>

                    );
                })}
                <button id="button_display_other_comment" class="btn btn-primary" style={{width:"300px", display: status_display_button }}
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


                <textarea type="text"  placeholder="Write you opinion"
                    ref={refComment} className={style.commentary_field} />

               
                <button className={style.button_comment} onClick={add_comment}>
                    <p style={{ color: "white" }}>Comment</p> </button>


                {commentary.map(item => {
                    if (item.Username == username) {
                        return (

                            <div className={style.user_commentary} >


                                <img src={user_icon} className={style.commentary_user_icon} />

                                <p style={{ color: "white" }} className={style.commentary_username }>{item.Username}</p>

                               
                              
                                <div id={"user_comment"+item.ID }>

                             <textarea type="text" className={style.commentary_field} value={item.Commentary}
                                        readOnly id={"textarea"+item.ID}/>

                                    <img src={edit_icon} className={style.edit_button} name={item.ID} onClick={update_textarea}
                                                 title="edit commentary"  />

                        <img src={trash_can} className={style.delete_button} style={{ display: status_delete_commentary_button }}
                                        name={item.ID} onClick={delete_comment} title="delete commentary"/>

                                </div>


                                <div id={"edit_user_comment"+item.ID } style={{ display: "none" }}>

                                <textarea type="text" className={style.commentary_field}
                                        onChange={update_textarea_text} id={"edit_textarea" + item.ID} />

                                    <img src={save_comment_icon} className={style.update_comment_button}
                                        name={item.ID} title="Save change" onClick={save_updated_comment }/>
                                </div>

                            </div>

                        );
                    }
                    else
                        return (

                            <div className={style.user_commentary}  >


                                <img src={user_icon} className={style.commentary_user_icon} />

                                <p style={{ color: "white" }} className={style.commentary_username}>{item.Username}</p>


                                <textarea type="text" className={style.commentary_field} value={item.Commentary} readOnly />

                               

                                <img src={trash_can} className={style.delete_button} style={{ display: status_delete_commentary_button }}
                                    name={item.ID} onClick={delete_comment} />

                            </div>

                        );
                })}

                <button id="button_display_other_comment" class="btn btn-primary" style={{ width:"300px",display: status_display_button }}
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


            <textarea type="text" className={ style.commentary_field} placeholder="Write you opinion"
                ref={refComment}  />

           
            <button  className={style.button_comment} onClick={add_comment}>
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