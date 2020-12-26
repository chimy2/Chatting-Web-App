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
    const [popupState, setPopupState] = useState(false);
    const popupOpen = () => {
        setPopupState(true);
    }
    return(
        <>
        <nav className="nav">
            <div>
                <Link to="/"><img src={profile} alt="profile"/></Link>
                <Link to="/talk"><img src={talk} alt="talk"/></Link>
                <Link to="/calendar"><img src={calendar} alt="calendar"/></Link>
                <Link to="/note"><img src={note} alt="note"/></Link>
                <Link to="/dot"><img src={dot} alt="dot"/></Link>
            </div>
            <div>
                <a><img src={bell} alt="bell"/></a>
                <a onClick={popupOpen}><img src={setting} alt="setting"/></a>
            </div>
        </nav>
        <Popup open={popupState} setPopupState={setPopupState}/>
        </>
    )
}

export default Navigation;