import React, { } from 'react';
import style from './Footer.module.css';
import logo from '../NavMenu/Logo.png'
export default function Footer() {




    return (
       


            <footer >
                

                <div  className={ style.footer_div}>

                <p className={style.footer_text }>

                        © 2023, GameShop,
                    Inc. All rights reserved. , the GameShop logo,
                    Inc. in the Rpublic of Moldova and elsewhere.
                    Other brands or product names are the trademarks of their respective
                        owners.   </p>

                    <img className={style.footer_logo} src={logo } />

                    </div>

                   
                    </footer>

            
        )
}