import { useState, useEffect } from "react";
import back from "../image/back.png";
import basicProfile from "../image/basic_profile.png";
import chat from "../image/profile_chat.png";
import block from "../image/profile_block.png";
import edit from "../image/edit.png";
import editProfile from "../image/profile_edit.png";
import editProfile2 from "../image/profile_edit2.png";
import editNote from "../image/note_edit.png";

function Expand(props) {
  const [editState, setEditState] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [state, setState] = useState(props);

  useEffect(() => {
    document.querySelector(".expand").focus();
    setEditState(false);
  }, [props]);

  const closeExpand = (e) => {
    if (
      e._reactName === "onClick" ||
      (e._reactName === "onKeyDown" && e.keyCode === 27)
    ) {
      if (editState) {
        if (
          !window.confirm(
            "우측 상단의 저장버튼을 눌러야 정상적으로 반영됩니다.\n저장하지 않고 창을 닫겠습니까?",
          )
        )
          return;
      }
      props.close();
    }
  };

  const toggleEdit = () => {
    const path = document.location.pathname;
    switch (path) {
      case "/":
        break;
      case "/note":
        let title = document.querySelector(".memoTitle input");
        let content = document.querySelector(".memoContent textarea");
        if (editState) {
          if (props.state[0] !== title.value || props.state[1] !== content.value) {
            if (window.confirm("수정된 내용을 저장하시겠습니까")) {
              setReadOnly(true);
            }
          } else {
            setReadOnly(true);
          }
        } else if (!editState) {
          setReadOnly(false);
        }
        break;
    }
    editState ? setEditState(false) : setEditState(true);
  };

  const editProfileBtn = (e) => {
    const name = e.target.name;
    e.target.classList.toggle("check");
    if (name === "photo") {
    } else if (name === "name") {
      const nickname = document.querySelector(".profileNameText");
      if (nickname.getAttribute("contentEditable")) {
        nickname.removeAttribute("contentEditable");
      } else {
        nickname.setAttribute("contentEditable", true);
        nickname.focus();
      }
    } else if (name === "message") {
      const message = document.querySelector(".profileMSGText");
      if (message.getAttribute("contentEditable")) {
        message.removeAttribute("contentEditable");
      } else {
        message.setAttribute("contentEditable", true);
        message.focus();
      }
    }
  };

  const Profile = () => {
    const editSrc = editState ? editProfile : edit;
    const editTitle = editState ? "프로필수정 저장" : "프로필수정";
    const editBtn = (
      <button title={editTitle} onClick={toggleEdit}>
        <img src={editSrc} alt="수정" />
      </button>
    );

    return (
      <div className="profile">
        {props.state.use === "profile" ? (
          <ExpandTitle right={editBtn} />
        ) : (
          <ExpandTitle />
        )}
        <div className="profileContent">
          <div className="profilePhoto">
            <div className="profilePhotoIMG">
              <img
                src={props.state.image !== null ? props.state.image : basicProfile}
                alt="프로필 사진"
              />
            </div>
            {editState ? (
              <div className="profilePhotoBtn">
                <button name="photo" onClick={editProfileBtn} title="프로필사진 수정">
                  <img src={editProfile2} alt="프로필사진 수정" />
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="profileName">
            {editState ? <div className="profileNameBtn" /> : ""}
            <div className="profileNameText" title={props.state.nickname}>
              {props.state.nickname}
            </div>
            {editState ? (
              <div className="profileNameBtn">
                <button name="name" onClick={editProfileBtn} title="프로필닉네임 수정">
                  <img src={editProfile2} alt="프로필닉네임 수정" />
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="profileMSG">
            {editState ? <div className="profileMSGBtn" /> : ""}
            <div className="profileMSGText" title={props.state.message}>
              {props.state.message}
            </div>
            {editState ? (
              <div className="profileMSGBtn">
                <button name="message" onClick={editProfileBtn}>
                  <img src={editProfile2} alt="프로필메세지 수정" />
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="profileIcon">
            {props.state.use === "friend" ? (
              <>
                <button title={`${props.state.nickname}님과 채팅하기`}>
                  <img src={chat} alt="채팅하기" />
                </button>
                <button title={`${props.state.nickname} 차단하기`}>
                  <img src={block} alt="차단하기" />
                </button>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  };

  const Schedule = () => {
    const scheduleDays = [];
    const length = props.length;
    const day = props.day;

    for (let i = 1; i <= Math.floor(length / 7 + 1) * 7; i++) {
      if (i > length - day && i <= length) {
        scheduleDays.push(
          <div className="scheduleDays" key={i}>
            <div className="scheduleDay">{i - (length - day)}</div>
            <div className="scheduleDayComment"></div>
          </div>,
        );
      } else {
        scheduleDays.push(
          <div className="scheduleDays" key={i}>
            <div className="scheduleDay"></div>
            <div className="scheduleDayComment"></div>
          </div>,
        );
      }
    }

    return (
      <div className="schedule">
        <ExpandTitle center={`${props.month}월`} />
        <div className="scheduleContent">{scheduleDays}</div>
      </div>
    );
  };

  const Memo = () => {
    const editSrc = editState ? editNote : edit;
    const editTitle = editState ? "노트수정 저장" : "노트수정";
    const editBtn = (
      <button title={editTitle} onClick={toggleEdit}>
        <img src={editSrc} alt="수정" />
      </button>
    );

    return (
      <div className="memo">
        <ExpandTitle right={editBtn} />
        <div className="memoContents">
          <div className="memoTitle">
            <input type="text" defaultValue={props.state[0]} readOnly={readOnly} />
          </div>
          <div className="memoContent">
            <textarea defaultValue={props.state[1]} readOnly={readOnly} />
          </div>
          <div className="memoDate">{props.state[2]}</div>
        </div>
      </div>
    );
  };

  const ExpandTitle = (title) => {
    return (
      <div className="expandTitle">
        <div className="expandTitleL">
          <button onClick={closeExpand} title="뒤로가기">
            <img src={back} alt="뒤로가기" />
          </button>
          <div>{title.left}</div>
        </div>
        <div className="expandTitleC">{title.center}</div>
        <div className="expandTitleR">{title.right}</div>
      </div>
    );
  };

  const ExpandContent = () => {
    const path = document.location.pathname;
    let component;
    switch (path) {
      case "/":
        component = <Profile />;
        break;
      case "/calendar":
        component = <Schedule />;
        break;
      case "/note":
        component = <Memo />;
    }
    return component;
  };

  return (
    <div className="expand" onKeyDown={closeExpand} tabIndex="0">
      <ExpandContent />
    </div>
  );
}

export default Expand;
