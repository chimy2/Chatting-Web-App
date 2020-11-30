import profile from '../image/menu_profile.png';
import chat from '../image/menu_chat.png';
import calendar from '../image/menu_calendar.png';
import note from '../image/menu_note.png';
import dot from '../image/menu_dot.png';
import bell from '../image/menu_bell.png';
import setting from '../image/menu_setting.png';

function Header() {
    return(
        <header className="header">
            <div className="top">
                <img src={profile} alt="profile"/>
                <img src={chat} alt="chat"/>
                <img src={calendar} alt="calendar"/>
                <img src={note} alt="note"/>
                <img src={dot} alt="dot"/>
            </div>
            <div className="bottom">
                <img src={bell} alt="bell"/>
                <img src={setting} alt="setting"/>
            </div>
        </header>
    )
}

export default Header;