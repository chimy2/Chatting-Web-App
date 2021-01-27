import { useState } from "react";
import List from "./List";
import Add from "./Add";
import add from "../image/add.png";
import search from "../image/sidebar_search.png";
import close from "../image/sidebar_close.png";
import basicProfile from "../image/basic_profile.png";

function SideBarTalk() {
  const [addState, setAddState] = useState(false);
  const openAdd = () => {
    setAddState(true);
  };

  return (
    <>
      <section className="sideBar">
        <div className="sideBarTitle">
          대화창
          <button onClick={openAdd}>
            <img src={add} alt="add" />
          </button>
        </div>
        <div className="listSearch">
          <img src={search} alt="search" />
          <input type="text" placeholder="채팅방 이름/참여자 검색" />
          <img src={close} alt="close" />
        </div>
        <div className="friendProfile">
          <List items={""} />
        </div>
      </section>
      <Add title="채팅 추가" open={addState} setAddState={setAddState} />
    </>
  );
}

export default SideBarTalk;
