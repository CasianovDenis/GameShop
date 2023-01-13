import React, {useEffect,useState } from "react";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import SlideShowHome from './SlideShowHome';
import Card_form from './Card_form';
import Footer from '../Footer/Footer';



export default function Home() {

    
        return (

            <>
             <SlideShowHome />
                <Card_form />
                <Footer />

                </>
        )
    
}