import React, {useEffect,useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import SlideShowHome from './SlideShowHome';



export default function Home() {


    //const [dbdata, setDbData] = useState(null);
    //const [request, setRequest] = useState(true);

    //useEffect(() => {

    //    if (request == true) {

    //        const requestOptions = {
    //            method: 'POST',
    //            headers: { 'Content-Type': 'application/json' },
    //            body: JSON.stringify()
    //        };



    //        //call api from backend and send json data,which create before

    //        fetch('http://localhost:56116/api/get_random_games', requestOptions)
    //            .then(response => response.json())
    //            .then((responseData) => {

    //                setDbData(responseData);
    //                setRequest(false);
    //            });
    //    }

    //    if (dbdata!= null) console.log(dbdata[0].Cover);
    //}, [dbdata]);



    //if (dbdata != null) {
        return (


             <SlideShowHome />
            

        )
    
}