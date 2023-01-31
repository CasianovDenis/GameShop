import React, { useState } from 'react';
import style from './ScrollTopButton.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';


export default function ScrollTopButton() {

    const [show_top_button, setShowTopButton] = useState(false);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            setShowTopButton(true);
        }
        else
            setShowTopButton(false);
    });



    return (
        
        <>

            {show_top_button && (

                <div className={style.top_button} >
                    <FontAwesomeIcon icon={faArrowUp} style={{ height: "25px", marginTop: "12px", marginLeft: "15px" }} onClick={goToTop} />
                </div>
            )}

            </>

    )
}