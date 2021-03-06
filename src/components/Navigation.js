import { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "./Popup";
import profile from "../image/menu_profile.png";
import talk from "../image/menu_talk.png";
import calendar from "../image/menu_calendar.png";
import note from "../image/menu_note.png";
import dot from "../image/menu_dot.png";
import bell from "../image/menu_bell.png";
import setting from "../image/menu_setting.png";

function Navigation(props) {
  const [popupState, setPopupState] = useState(false);
  const popupOpen = () => {
    setPopupState(true);
  };
  return (
    <>
      <nav className="nav">
        <section>
          <Link to="/" title="친구">
            <img src={profile} alt="profile" />
          </Link>
          <Link to={{pathname: "/talk", socket: props.socket}} title="대화">
            <img src={talk} alt="talk" />
          </Link>
          <Link to="/calendar" title="달력">
            <img src={calendar} alt="calendar" />
          </Link>
          <Link to="/note" title="노트">
            <img src={note} alt="note" />
          </Link>
          <Link to="/dot" title="기타">
            <img src={dot} alt="dot" />
          </Link>
        </section>
        <section>
          <button title="알림">
            <img src={bell} alt="bell" />
          </button>
          <button onClick={popupOpen} title="설정">
            <img src={setting} alt="setting" />
          </button>
        </section>
      </nav>
      <Popup open={popupState} setPopupState={setPopupState} setLogin={props.setLogin} socket={props.socket}/>
    </>
  );
}

export default Navigation;
