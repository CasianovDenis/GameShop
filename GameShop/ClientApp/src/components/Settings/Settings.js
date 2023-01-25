import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import style from './Settings.module.css';
import Account_Settings from './Account_Settings';
import Account_Billing from './Account_Billing';
import Account_Security from './Account_Security';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear,faShield,faCreditCard } from '@fortawesome/free-solid-svg-icons';
import GetCookie from '../public_files/GetCookie';

export default function Settings() {

    const [account_settings, setAccountSettings] = useState("displaying");
    const [security, setSecurity] = useState(null);
    const [billing, setBilling] = useState(null);

    const redirect = useHistory();

    if (GetCookie("status_account") != "online") redirect.push('/');

    const select_nav_element = (ev) => {

        let data = ev.target.getAttribute('title');
        


        if (data == "Account Settings") {
            setAccountSettings("displaying");
            setSecurity(null);
            setBilling(null);
           
        }
        else
            if (data == "Security") {
                setAccountSettings(null);
                setSecurity("displaying");
                setBilling(null);
            }
            else
                if (data == "Billing") {
                    setAccountSettings(null);
                    setSecurity(null);
                    setBilling("displaying");
                }

    }

    if (account_settings =="displaying")
    return(

        <div>


            <div className={style.settings_nav_menu}>

                <p  className={style.settings_nav_menu_list} title="Account Settings" onClick={select_nav_element}>
                    <FontAwesomeIcon icon={faGear} style={{ marginLeft: "5px" }} /> Account Settings </p>

                <p className={style.settings_nav_menu_list} title="Security" onClick={select_nav_element}>
                    <FontAwesomeIcon icon={faShield} style={{ marginLeft: "5px" }} /> Security </p>

                <p  className={style.settings_nav_menu_list} title="Billing" onClick={select_nav_element}>
                              <FontAwesomeIcon icon={faCreditCard} style={{ marginLeft: "5px" }} /> Billing </p>

                </div>


            <Account_Settings />
            
               
            

        </div>
        )
    else
        if (security == "displaying")
            return (

                <div>


                    <div className={style.settings_nav_menu}>

                        <p className={style.settings_nav_menu_list} title="Account Settings" onClick={select_nav_element}>
                            <FontAwesomeIcon icon={faGear} style={{ marginLeft: "5px" }} /> Account Settings </p>

                        <p className={style.settings_nav_menu_list} title="Security" onClick={select_nav_element}>
                            <FontAwesomeIcon icon={faShield} style={{ marginLeft: "5px" }} /> Security </p>

                        <p className={style.settings_nav_menu_list} title="Billing" onClick={select_nav_element}>
                            <FontAwesomeIcon icon={faCreditCard} style={{ marginLeft: "5px" }} /> Billing </p>

                    </div>


                    <Account_Security />




                </div>
            )
        else
            if (billing == "displaying")
                return (

                    <div>


                        <div className={style.settings_nav_menu}>

                            <p className={style.settings_nav_menu_list} title="Account Settings" onClick={select_nav_element}>
                                <FontAwesomeIcon icon={faGear} style={{ marginLeft: "5px" }} /> Account Settings </p>

                            <p className={style.settings_nav_menu_list} title="Security" onClick={select_nav_element}>
                                <FontAwesomeIcon icon={faShield} style={{ marginLeft: "5px" }} /> Security </p>

                            <p className={style.settings_nav_menu_list} title="Billing" onClick={select_nav_element}>
                                <FontAwesomeIcon icon={faCreditCard} style={{ marginLeft: "5px" }} /> Billing </p>

                        </div>


                        <Account_Billing />




                    </div>
                )
}