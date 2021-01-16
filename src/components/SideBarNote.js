import { useState, useEffect } from "react";
import List from "./List";
import Add from "./Add";
import Table from "./Table";
import add from "../image/add.png";
import search from "../image/note_search.png";
import close from "../image/sidebar_close.png";

function SideBarNote() {
  const [addState, setAddState] = useState(false);
  const [noteList, setNoteList] = useState();
  const addOpen = () => {
    setAddState(true);
  };

  useEffect(() => {
    callNote();
  }, []);

  const callNote = () => {
    callApi("/note").then((res) => {
      let arr = [];
      res.forEach((items, index) => {
        arr.push(
          <Table
            key={index}
            title={items.title}
            content={items.content}
            date={items.date}
          />,
        );
      });
      setNoteList(arr);
    });
  };

  const callApi = async (address) => {
    const response = await fetch(`/api${address}`);
    const body = await response.json();
    return body;
  };

  return (
    <>
      <section className="sideBar">
        <div className="sideBarTitle">
          노트
          <button onClick={addOpen}>
            <img src={add} alt="add" />
          </button>
        </div>
        <div className="listSearch">
          <img src={search} alt="search" />
          <input type="text" placeholder="노트 제목/내용 검색" />
          <img src={close} alt="close" />
        </div>
        <div className="noteList">{noteList ? noteList : ""}</div>
      </section>
      <Add
        title="노트 추가"
        placeholder="노트 제목"
        open={addState}
        setAddState={setAddState}
        callNote={callNote.bind()}
      />
    </>
  );
}

export default SideBarNote;
