import { useEffect } from "react";
import back from "../image/back.png";
import basicProfile from "../image/basic_profile.png";

function Expand(props) {
  const closeExpand = () => {
    props.close();
  }

  const Profile = () => {
    console.log(props.item);
    return (
      <div className="profile">
        <ExpandTitle />
        <div className="profileIMG">
          <img src={props.item.image!== null ? props.item.image : basicProfile} alt="프로필 사진"/>
        </div>
        <div className="profileContent">
          <div className="profileName">
            {props.item.nickname}
          </div>
          <div className="profileMSG">
            {props.item.message}
          </div>
          <div className="profileIcon">
          </div>
        </div>
      </div>
    );
  }

  const ExpandTitle = (title) => {
    return(
      <div className="expandTitle">
        <span>
          <button onClick={closeExpand}>
            <img src={back} alt="뒤로가기" />
          </button>
          {title.left}
        </span>
        <span>{title.right}</span>
      </div>
    );
  }

  return (
    <div className="expand">
      {document.location.pathname==="/"? <Profile/>:""}
    </div>
  );
}

export default Expand;
