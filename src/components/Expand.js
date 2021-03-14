import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Add from "./Add";
import back from "../image/back.png";
import basicProfile from "../image/basic_profile.png";
import chat from "../image/profile_chat.png";
import block from "../image/profile_block.png";
import edit from "../image/edit.png";
import editProfile from "../image/profile_edit.png";
import editProfile2 from "../image/profile_edit2.png";
import editNote from "../image/note_edit.png";
import talkMenu from "../image/talk_menu.png";

function Expand(props) {
  // width 침범 해결
  const path = document.location.pathname;
  const socket = props.socket;
  const [addState, setAddState] = useState(false);
  const [editState, setEditState] = useState(false);
  const [menuState, setMenuState] = useState(false);
  const [readOnly, setReadOnly] = useState(true);
  const [state, setState] = useState(props.state);
  const [cookies, setCookie, removeCookie] = useCookies();

  socket.on("talk", (data) => {
    console.log("client talk", data);
    if (data.id === cookies.id){
      console.log("본인", data);
    } else {
      console.log("타인", data);
    }
  });

  useEffect(() => {
    setState(props.state);
    if(path !== "/talk") {
      document.querySelector(".expand").focus();
    } else {
      socket.emit("join", {roomId: "33", id: cookies.id});
      document.querySelector(".talkMSG").focus();
    }
    if (path === "/" || path === "/note") {
      setEditState(false);
    }
  }, [path, props.state]);

  const closeExpand = (e) => {
    if (
      e.type === "click" ||
      (e.type === "keydown" && e.keyCode === 27)
    ) {
      if (editState) {
        if (path === "/" || path === "/note") {
          // 변경사항이 있으면 실행
          if (
            !window.confirm(
              "우측 상단의 저장버튼을 눌러야 정상적으로 반영됩니다.\n저장하지 않고 창을 닫겠습니까?",
            )
          )
            return;
        }
      }
      if(path === "/talk") {
        socket.emit("leave", {roomId: "33", id: cookies.id});
      }
      props.close();
    }
  };

  const toggleEdit = () => {
    if (path === "/") {
      // const { nickname, image, message } = state;
      const { nickname, message } = state;
      // const profilePhoto = document.querySelector(".profilePhotoIMG");
      const profileName = document.querySelector(".profileNameText");
      const profileMSG = document.querySelector(".profileMSGText");
      if (editState) {
        if (nickname !== profileName.textContent || message !== profileMSG.textContent) {
          if (window.confirm("수정된 내용을 저장하시겠습니까?")) {
            callApi("/friend/profile", {
              nickname: profileName.textContent,
              message: profileMSG.textContent,
            });
          }
        }
      }
    } else if (path === "/note") {
      const { noteId, title, content } = state;
      const memoTitle = document.querySelector(".memoTitle input");
      const memoContent = document.querySelector(".memoContent textarea");
      if (editState) {
        if (title !== memoTitle.value || content !== memoContent.value) {
          if (window.confirm("수정된 내용을 저장하시겠습니까")) {
            callApi("/note", {
              noteId,
              title: memoTitle.value,
              content: memoContent.value,
            }).then(() => {
              setState({ ...state, title: memoTitle.value, content: memoContent.value });
              props.callNote();
            });
          }
        }
        setReadOnly(true);
      } else if (!editState) {
        setReadOnly(false);
      }
    }
    editState ? setEditState(false) : setEditState(true);
  };

  const toggleMenu = () => {

  };

  const handleProfileEditBtn = (e) => {
    // 이벤트 전파 해결
    const name = e.target.name;
    e.preventDefault();
    e.stopPropagation();
    e.target.classList.toggle("check");
    // console.log(props.state);

    e.nativeEvent.stopImmediatePropagation();
    if (name === "photo") {
      // const photo = document.querySelector(".profilePhotoIMG");
      setAddState(true);
      // if (photo.onclick) {
      //   photo.removeEventListener("click");
      //   alert("여기");
      // } else {
      //   alert("여기2");
      //   photo.addEventListener("click", (e) => {
      //     e.preventDefault();
      //     e.stopPropagation();
      //     e.stopImmediatePropagation();
      //     setAddState(true);
      //   });
      // }
    } else if (name === "name") {
      const nickname = document.querySelector(".profileNameText");
      if (nickname.getAttribute("contentEditable")) {
        if (nickname.textContent === "") {
          alert("닉네임은 비어있을 수 없습니다");
          nickname.textContent = state.nickname;
        }
        nickname.removeAttribute("contentEditable");
      } else {
        nickname.setAttribute("contentEditable", true);
        // nickname.setAttribute("data-placeholder", state.name);
        nickname.focus();
        if (nickname.textContent !== "") {
          document.getSelection().collapse(nickname, 1);
        }
      }
    } else if (name === "message") {
      const message = document.querySelector(".profileMSGText");
      if (message.getAttribute("contentEditable")) {
        message.removeAttribute("contentEditable");
      } else {
        message.setAttribute("contentEditable", true);
        message.focus();
        if (message.textContent !== "") {
          document.getSelection().collapse(message, 1);
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    const msg = e.target;
    if(e.key === "Enter") {
      if(e.getModifierState("Control")) {
        msg.value+="\n";
      } else if(msg.value.trim() !== "") {
        sendMSG(e);
      }
    }
  };

  const sendMSG = (e) => {
    e.preventDefault();
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const msg = document.querySelector(".talkMSG");
    const window = document.querySelector(".talkWindow");
    const times = document.querySelectorAll('.talkI input[type=hidden]');
    if(times.length > 0){
      const pastTime = new Date(times[times.length-1].value);
      if(pastTime.getHours() === date.getHours() && pastTime.getMinutes() === date.getMinutes()){
        const talkWindowLastChild = document.querySelector('.talkWindow').lastChild;
        if(talkWindowLastChild.className === "talkI"){
          const article = document.createElement('article');
          
          const talkIMSG = document.createElement('div');
          talkIMSG.className = "talkIMSG";
          talkIMSG.textContent = msg.value;
          article.appendChild(talkIMSG);

          const talkITime = document.createElement('div');
          talkITime.className = "talkITime";

          const span = document.createElement('span');
          span.textContent = `${hour>=12?"오후":"오전"} ${hour%12===0?12:hour%12}:${String(minutes).padStart(2, 0)}`;
          talkITime.appendChild(span);

          const input = document.createElement('input');
          input.type = "hidden";
          input.value = date;
          talkITime.appendChild(input);

          article.appendChild(talkITime);
          talkWindowLastChild.lastChild.appendChild(article);
        }
      } else {
        appendTalkI(date, msg.value);
      }
    } else {
      appendTalkI(date, msg.value);
    }
    window.scrollTop = window.scrollHeight;
    socket.emit('talk', {roomId: "33", id: cookies.id, msg: msg.value});
    msg.value = "";
    msg.focus();
  };

  const receiveMSG = (data) => {
  }

  const appendTalkI = (date, msg) => {
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const window = document.querySelector('.talkWindow');

    const talkI = document.createElement('article');
    talkI.className = "talkI";

    const talkIContent = document.createElement('section');
    talkIContent.className = "talkIContent";

    const article = document.createElement('article');
    
    const talkIMSG = document.createElement('div');
    talkIMSG.className = "talkIMSG";
    talkIMSG.textContent = msg;
    article.appendChild(talkIMSG);

    const talkITime = document.createElement('div');
    talkITime.className = "talkITime";

    const span = document.createElement('span');
    span.textContent = `${hour>=12?"오후":"오전"} ${hour%12===0?12:hour%12}:${String(minutes).padStart(2, 0)}`;
    talkITime.appendChild(span);

    const input = document.createElement('input');
    input.type = "hidden";
    input.value = date;
    talkITime.appendChild(input);

    article.appendChild(talkITime);
    talkIContent.appendChild(article);
    talkI.appendChild(talkIContent);
    window.appendChild(talkI);
  }

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
        {state.use === "profile" ? <ExpandTitle right={editBtn} /> : <ExpandTitle />}
        <div className="profileContent">
          <div className="profilePhoto">
            <div className="profilePhotoIMG">
              <img
                src={state.image !== null ? state.image : basicProfile}
                alt="프로필 사진"
              />
            </div>
            {editState ? (
              <div className="profilePhotoBtn">
                <button
                  name="photo"
                  onClick={handleProfileEditBtn}
                  title="프로필사진 수정"
                >
                  <img src={editProfile2} alt="프로필사진 수정" />
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="profileName">
            {editState ? <div className="profileNameBtn" /> : ""}
            <div className="profileNameText" title={state.nickname}>
              {state.nickname}
            </div>
            {editState ? (
              <div className="profileNameBtn">
                <button
                  name="name"
                  onClick={handleProfileEditBtn}
                  title="프로필닉네임 수정"
                >
                  <img src={editProfile2} alt="프로필닉네임 수정" />
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="profileMSG">
            {editState ? <div className="profileMSGBtn" /> : ""}
            <div className="profileMSGText" title={state.message}>
              {state.message}
            </div>
            {editState ? (
              <div className="profileMSGBtn">
                <button
                  name="message"
                  onClick={handleProfileEditBtn}
                  title="프로필메시지 수정"
                >
                  <img src={editProfile2} alt="프로필메시지 수정" />
                </button>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="profileIcon">
            {state.use === "friend" ? (
              <>
                <button title={`${state.nickname}님과 채팅하기`}>
                  <img src={chat} alt="채팅하기" />
                </button>
                <button title={`${state.nickname} 차단하기`}>
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

  const Talk = () => {
    const menuTitle = menuState ? "메뉴열기" : "메뉴열기";
    const menuBtn = (
      <button title={menuTitle} onClick={toggleMenu}>
        <img src={talkMenu} alt="수정" />
      </button>
    );
    return (
      <div className="talk">
        <ExpandTitle center="닉네임입니다" right={menuBtn}/>
        <div className="talkWindow"></div>
        <div className="talkContent">
          <textarea type="text" className="talkMSG" onKeyDown={handleKeyDown}/>
          <button title="전송" onClick={sendMSG}>
            전송
          </button>
        </div>
      </div>
    );
  };

  const Schedule = () => {
    const scheduleDays = [];
    const length = props.length;
    const day = props.day;

    for (let i = 1; i <= Math.ceil(length / 7) * 7; i++) {
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
    // const { noteId, title, content, date } = state;
    const { title, content, date } = state;
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
            <input type="text" defaultValue={title} readOnly={readOnly} />
          </div>
          <div className="memoContent">
            <textarea defaultValue={content} readOnly={readOnly} />
          </div>
          <div className="memoDate">{date}</div>
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
    let component;
    if(path === "/") {
      component = <Profile />;
    } else if(path === "/talk") {
      component = <Talk />;
    } else if(path === "/calendar") {
      component = <Schedule />;
    } else if(path === "/note") {
      component = <Memo />;
    }
    return component;
  };

  const callApi = async (address, data) => {
    const response = await fetch(`/api${address}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response;
  };

  return (
    <>
      <div className="expand" onKeyDown={closeExpand} tabIndex="0">
        <ExpandContent />
      </div>
      <Add
        title="프로필사진 불러오기"
        placeholder="사진 불러오기"
        use="loadFile"
        open={addState}
        setAddState={setAddState}
      />
    </>
  );
}

export default Expand;
