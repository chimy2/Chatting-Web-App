import { useState, useEffect } from "react";
import List from "./List";
import close from "../image/close.png";
import search from "../image/search.png";
import folder from "../image/folder.png";
import add from "../image/add.png";

function Add(props) {
  const path = document.location.pathname;
  const [overlay, setOverlay] = useState("overlay-close");
  const [friendSearch, setFriendSearch] = useState();
  const [profileImage, setProfileImage] = useState();
  const [talkSearchWord, setTalkSearchWord] = useState("");
  const [talkSearchRes, setTalkSearchRes] = useState();
  
  const closeAdd = (e) => {
    // console.log(e);
    // if (
    //   e._reactName === "onClick" ||
    //   (e._reactName === "onKeyDown" && e.keyCode === 27)
    // ) {
      if (props.use === "loadFile") {
        props.setAddState(false);
      } else if (path === "/") {
        props.setAddState({
          addState: false,
        });
        document.querySelector(".addMainTitle > form > input").value = "";
        setFriendSearch();
      } else if (path === "/note") {
        props.setAddState({
          addState: false,
        });
        document.querySelector(".addMainTitle > form > input").value = "";
        document.querySelector(".addMainContent > textarea").value = "";
      } else {
        props.setAddState(false);
        document.querySelector(".addMainTitle > form > input").value = "";
        setTalkSearchWord("");
        setTalkSearchRes();
      }
      setOverlay("overlay-close");
    // }
  };

  useEffect(() => {
    if(!props.open || props.use === null || profileImage === undefined) return;
    console.log("옵니다");
    const canvas = document.querySelector(".addMainContent canvas");
    console.log("profileImage",profileImage);
    canvas.getContext("2d").drawImage(profileImage, 0, 0);
  }, [profileImage]);

  useEffect(() => {
    if (props.open) {
      setOverlay("overlay-open");
      if(props.use ==="loadFile"){
        // resize 시 canvas size 조정
        window.addEventListener("resize", (e) => {
          const canvas = document.querySelector(".addMainContent canvas");
          const beforeCanvas = document.createElement("canvas");
          beforeCanvas.width=canvas.width;
          beforeCanvas.height=canvas.height;
          beforeCanvas.getContext("2d").drawImage(canvas, 0, 0);
          canvas.width=canvas.parentElement.clientWidth;
          canvas.height=canvas.parentElement.clientHeight;
          canvas.getContext('2d').drawImage(beforeCanvas, 0, 0);
        })
      }
    }
  }, [props.open]);

  useEffect(() => {
    if (path !== "/talk") return;
    callApi("/friend/friend")
      .then((res) => res.json())
      .then((res) => {
        const arr = [];
        res.forEach((item) => {
          if (item.nickname.match(`.*${talkSearchWord}.*`) !== null) {
            arr.push(item);
          }
        });
        return arr;
      })
      .then(setTalkSearchRes);
  }, [props.open, talkSearchWord]);

  const handleFormSubmit = (e) => {
    const value = e.target[0].value;

    e.preventDefault();
    if (path === "/") {
      setFriendSearch();
      if (value.length < 4) {
        alert("4글자 이상 입력해주세요");
      } else {
        callApi("/friend/search", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            search: value,
          }),
        })
          .then((res) => res.json())
          .then((res) => res[0])
          .then((res) => {
            if (res.num === 0) {
              alert("찾는 친구의 정보가 없습니다");
            } else if (res.num === 1 && res.id !== undefined) {
              alert("자신에게 친구 요청을 할 수 없습니다");
            } else if (res.id === undefined) {
              alert("이미 친구거나 친구 요청을 한 상태입니다");
            } else {
              setFriendSearch(res);
            }
          });
      }
    } else if (path === "/talk") {
      setTalkSearchWord(value);
    } else {
      const textarea = document.querySelector("textarea").value;
      if (value.length < 1) {
        alert("제목을 입력해주세요");
      } else if (textarea.length < 1) {
        alert("내용을 입력해주세요");
      } else {
        if (window.confirm("저장하시겠습니까?")) {
          callApi("/note", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: value,
              content: textarea,
            }),
          }).then(() => {
            closeAdd();
            props.callNote();
          });
        }
      }
    }
  };

  const callApi = async (address, content) => {
    const response = await fetch(`/api${address}`, content);
    return response;
  };

  // const handleImageFile = (e) => {
    // const canvas = document.querySelector(".addMainContent canvas");
    // const ctx = canvas.getContext('2d');
    // const image = new Image();
    // image.src = URL.createObjectURL(e.target.files[0]);
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // image.onload=()=> {
      // 이미지가 로드된 후 canvas에 붙여넣기
    //   ctx.drawImage(image, 0,0);
    // };
    // content.appendChild(image);
  // };

  const LoadFile = () => {
    return (
      <>
        <div className="addMainTitle">
          <form>
            {/* input file 재배치 */}
            {/* <label>여기</label> */}
            <input
              type="file"
              id="input-file"
              accept=".png,.jpg,.jpeg,.jpe,.gif"
              // 모든 이미지 파일 불러오기
              // accept="image/*"
              capture
              onChange={(e)=>setProfileImage(e.target.files[0])}
            />
            <button title="파일 불러오기">
              <img src={folder} alt="파일 불러오기" htmlFor="input-file" />
            </button>
          </form>
        </div>
        <div className="addMainContent">
          <canvas></canvas>
        </div>
      </>
    );
  };

  const AddFriend = () => {
    return (
      <>
        <div className="addMainTitle">
          <form onSubmit={handleFormSubmit}>
            <input type="text" placeholder={props.placeholder} />
            <button type="submit" title="검색">
              <img src={search} alt="search" />
            </button>
          </form>
        </div>
        <div className="addMainContent">
          {friendSearch ? (
            <List
              items={friendSearch}
              friend={friendSearch.id}
              closeAdd={closeAdd.bind()}
            />
          ) : (
            ""
          )}
        </div>
      </>
    );
  };

  const AddTalk = () => {
    return (
      <>
        <div className="addMainTitle">
          <form onSubmit={handleFormSubmit}>
            <input type="text" placeholder={props.placeholder} />
            <button type="submit" title="검색">
              <img src={search} alt="search" />
            </button>
          </form>
        </div>
        <div className="addMainContent">
          {talkSearchRes
            ? talkSearchRes.map((items) => <List key={items.id} items={items} />)
            : ""}
        </div>
      </>
    );
  };

  const AddNote = () => {
    return (
      <>
        <div className="addMainTitle">
          <form onSubmit={handleFormSubmit}>
            <input type="text" placeholder={props.placeholder} />
            <button type="submit" title="추가">
              <img src={add} alt="add" />
            </button>
          </form>
        </div>
        <div className="addMainContent">
          <textarea placeholder="노트 내용" maxLength="20000" />
        </div>
      </>
    );
  };

  const AddContent = () => {
    let component;
    if (props.use === "loadFile") {
      component = <LoadFile />;
    } else if (path === "/") {
      component = <AddFriend />;
    } else if (path === "/talk") {
      component = <AddTalk />;
    } else if (path === "/note") {
      component = <AddNote />;
    }
    return component;
  };

  return (
    <div className={overlay}>
      <div className="add">
        <div className="addTitle">
          <div className="addTitleText">{props.title}</div>
          <div className="addTitleBtn">
            <button onClick={closeAdd} title="닫기">
              <img src={close} alt="close" />
            </button>
          </div>
        </div>
        <AddContent />
      </div>
    </div>
  );
}

export default Add;
