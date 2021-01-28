import back from "../image/back.png";
import basicProfile from "../image/basic_profile.png";
import chat from "../image/profile_chat.png";
import block from "../image/profile_block.png";

function Expand(props) {
  const closeExpand = () => {
    props.close();
  };
  
  const Profile = () => {
    return (
      <div className="profile">
        <ExpandTitle />
        <div className="profileContent">
          <div className="profileIMG">
            <img
              src={props.state.image !== null ? props.state.image : basicProfile}
              alt="프로필 사진"
            />
          </div>
          <div className="profileName">{props.state.nickname}</div>
          <div className="profileMSG">{props.state.message}</div>
          <div className="profileIcon">
            {
              props.state.use === "friend" ?
              <>
                <button title={`${props.state.nickname}님과 채팅하기`}>
                  <img src={chat} alt="채팅하기" />
                </button>
                <button title={`${props.state.nickname} 차단하기`}>
                  <img src={block} alt="차단하기" />
                </button>
              </>
              : ""
            }
          </div>
        </div>
      </div>
    );
  };

  const ExpandTitle = (title) => {
    return (
      <div className="expandTitle">
        <span>
          <button onClick={closeExpand} title="뒤로가기">
            <img src={back} alt="뒤로가기"/>
          </button>
          {title.left}
        </span>
        <span>{title.right}</span>
      </div>
    );
  };

  return (
    <div className="expand">{document.location.pathname === "/" ? <Profile /> : ""}</div>
  );
}

export default Expand;
