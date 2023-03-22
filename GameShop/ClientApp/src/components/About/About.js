import React, { } from 'react';

import style from './About.module.css';

import logo from '../public_files/Logo.png';
import AuthorPhoto from './AuthorPhoto.jpg';

export default function About() {



    return (

        <div className={ style.About_div}>

            <img src={logo} className={style.logo} />
            <i></i>
            <div>
                <p>Game Shop was founded in 2022 as a simple site with random keys by student from Moldova State University Casianov Denis </p>

            </div>

            <img src={AuthorPhoto} className={ style.author_photo}/>

</div>
        )
}