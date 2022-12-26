import React, {useEffect,useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import SlideShow from './SlideShow';



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


             <SlideShow />
            //<div>
            //    <div id="carouselExampleFade" class="carousel slide carousel-fade" data-bs-ride="carousel">
            //        <div class="carousel-inner">
            //            <div class="carousel-item active">
            //                <img src={dbdata[0].Cover} class="d-block w-100" alt="..." />
            //            </div>
            //            <div class="carousel-item">
            //                <img src="..." class="d-block w-100" alt="..." />
            //            </div>
            //            <div class="carousel-item">
            //                <img src="..." class="d-block w-100" alt="..." />
            //            </div>
            //        </div>
            //        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            //            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            //            <span class="visually-hidden">Previous</span>
            //        </button>
            //        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            //            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            //            <span class="visually-hidden">Next</span>
            //        </button>
            //    </div>

            //</div>

        )
    //}
    //else
    //    return (<> </>)
}