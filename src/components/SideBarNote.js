import React from "react";
import Add from "./Add";
import Table from "./Table";
import add from "../image/add.png";
import search from "../image/note_search.png";
import close from "../image/sidebar_close.png";

class SideBarNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      noteList: [],
      addState: false,
    };
  }

  addOpen = () => {
    this.setState({
      addState: true,
    });
  };

  componentDidMount() {
    this.callNote();
  }

  callNote = async () => {
    console.log(2);
    this.callApi("/note").then((res) => {
      this.setState({
        noteList: res,
      });
    });
  };

  callApi = async (address) => {
    const response = await fetch(`/api${address}`);
    const body = await response.json();
    return body;
  };

  changeSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  render() {
    const noteList = this.state.noteList;
    let notes = [];

    if (noteList) {
      const reg = new RegExp(`.*${this.state.search}.*`);
      noteList.forEach((items, index) => {
        if (items.title.match(reg) || items.content.match(reg)) {
          notes.push(
            <Table
              key={index}
              title={items.title}
              content={items.content}
              date={items.date}
            />,
          );
        }
      });
    }

    return (
      <>
        <section className="sideBar">
          <div className="sideBarTitle">
            노트
            <button onClick={this.addOpen}>
              <img src={add} alt="add" />
            </button>
          </div>
          <div className="listSearch">
            <img src={search} alt="search" />
            <input
              type="text"
              placeholder="노트 제목/내용 검색"
              onChange={this.changeSearch}
            />
            <img src={close} alt="close" />
          </div>
          <div className="noteList">{notes}</div>
        </section>
        <Add
          title="노트 추가"
          placeholder="노트 제목"
          open={this.state.addState}
          setAddState={(e) => this.setState(e)}
          callNote={this.callNote.bind()}
        />
      </>
    );
  }
}

export default SideBarNote;
