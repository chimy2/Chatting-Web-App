import { useState } from "react";
import List from "./List";
import Add from "./Add";
import Expand from './Expand';
import add from "../image/add.png";
import search from "../image/sidebar_search.png";
import close from "../image/sidebar_close.png";

function SideBarTalk() {
  const [addState, setAddState] = useState(false);
  const [expand, setExpand] = useState();
  const [expandItem, setExpandItem] = useState();

  const openAdd = () => {
    setAddState(true);
  };

  const openExpand = () => {
    setExpand(true);
  }

  const closeExpand = () => {
    setExpand();
  }

  return (
    <>
      <section className="sideBar">
        <div className="sideBarTitle">
          대화창
          <button onClick={openAdd} title="대화추가">
            <img src={add} alt="add" />
          </button>
        </div>
        <div className="listSearch">
          <img src={search} alt="search" />
          <input type="text" placeholder="채팅방 이름/참여자 검색" />
          <img src={close} alt="close" />
        </div>
        <div className="friendProfile">
          <List items={""} open={openExpand} items={1} setState={setExpandItem}/>
          <List items={""} open={openExpand} items={2} setState={setExpandItem}/>
        </div>
      </section>
      <Add title="채팅 추가" open={addState} setAddState={setAddState} placeholder="친구 이름 검색"/>
      {
        expand ? <Expand close={closeExpand} state={expandItem}/> : ""
      }
    </>
  );
}

export default SideBarTalk;
