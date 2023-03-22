import React, { } from 'react';

import style from './Footer.module.css';
import { useHistory } from 'react-router-dom';

export default function Footer() {

    const redirect = useHistory();

    const redirect_about = () => {
        redirect.push('/About');
    }


    return (

            <footer >
                
            <div className={style.language_block }>
                <p>Language :<span> English </span></p>
                </div>


            <div className={ style.currency_block}>
                    <p>Currency :<span> $ </span></p>
                </div>

            <div className={style.about_block}>
                <p onClick={redirect_about}>About</p>
            </div>

            <div className={style.footer_text}>

                <p >

                        © 2023, GameShop,
                    Inc. All rights reserved. , the GameShop logo,
                    Inc. in the Republic of Moldova and elsewhere.
                    Other brands or product names are the trademarks of their respective
                        owners.   </p>
</div>             

                   
                    </footer>

            
        )
}