import { useState, useEffect } from "react";
import List from "./List";
import close from "../image/close.png";
import search from "../image/search.png";
import add from "../image/add.png";

function Add(props) {
  const [overlay, setOverlay] = useState("overlay-close");
  const [friendSearch, setFriendSearch] = useState();
  const [talkSearch, setTalkSearch] = useState();

  const addClose = () => {
    const path = document.location.pathname;
    if (path === "/") {
      props.setAddState({
        addState: false,
      });
      document.querySelector(".addMainTitle > form > input").value = "";
      setFriendSearch();
    } else if (path === "/note") {
      props.setAddState({
        addState: false,
      });
      if (path === "/note") {
        document.querySelector(".addMainTitle > form > input").value = "";
        document.querySelector(".addMainContent > textarea").value = "";
      }
    } else {
      props.setAddState(false);
    }
    setOverlay("overlay-close");
  };

  useEffect(() => {
    if (props.open) {
      setOverlay("overlay-open");
    }
  }, [props.open]);

  const handleFormSubmit = (e) => {
    const path = document.location.pathname;
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
    } else if(path === "/talk"){
      alert("talk");
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
            addClose();
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

  return (
    <div className={overlay}>
      <div className="add">
        <div className="addTitle">
          {props.title}
          <button onClick={addClose} title="닫기">
            <img src={close} alt="close" />
          </button>
        </div>
        <div className="addMainTitle">
          <form onSubmit={handleFormSubmit}>
            <input type="text" placeholder={props.placeholder} />
            {document.location.pathname === "/note" ? (
              <button type="submit" title="추가">
                <img src={add} alt="add" />
              </button>
            ) : (
              <button type="submit" title="검색">
                <img src={search} alt="search" />
              </button>
            )}
          </form>
        </div>
        <div className="addMainContent">
          {friendSearch ? (
            <List items={friendSearch} add={friendSearch.id} addClose={addClose.bind()} />
          ) : (
            ""
          )}
          {talkSearch ? 
            talkSearch.map(items => <List key={items.id} items={items} />) : ""
          }
          {document.location.pathname === "/note" ? (
            <textarea placeholder="노트 내용" maxLength="20000" />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default Add;
