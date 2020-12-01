import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Popup from './Popup';
import profile from '../image/menu_profile.png';
import talk from '../image/menu_talk.png';
import calendar from '../image/menu_calendar.png';
import note from '../image/menu_note.png';
import dot from '../image/menu_dot.png';
import bell from '../image/menu_bell.png';
import setting from '../image/menu_setting.png';

function Navigation() {
    const [popupOpen, setPopupOpen] = useState('none');
    const popup = () => {
        if(popupOpen === 'none')
        setPopupOpen('block');
    }
    return(
        <>
        <nav className="nav">
            <div className="top">
                <Link to="/friend"><img src={profile} alt="profile"/></Link>
                <Link to="/talk"><img src={talk} alt="talk"/></Link>
                <Link to="/calendar"><img src={calendar} alt="calendar"/></Link>
                <Link to="/note"><img src={note} alt="note"/></Link>
                <Link to="/dot"><img src={dot} alt="dot"/></Link>
            </div>
            <div className="bottom">
                <Link href=""><img src={bell} alt="bell"/></Link>
                <Link href="" onClick={popup}><img src={setting} alt="setting"/></Link>
            </div>
        </nav>
        <Popup/>
        </>
    )
}

export default Navigation;