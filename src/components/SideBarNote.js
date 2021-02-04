import React from "react";
import Note from "./Note";
import Add from "./Add";
import Expand from "./Expand";
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
      expandState: false,
      expandItem: []
    };
  }

  openAdd = () => {
    this.setState({
      addState: true,
    });
  };

  componentDidMount() {
    this.callNote();
  }

  callNote = () => {
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
  
  openExpand = (items) => {
    this.setState({
      expandState: true,
    });
  };

  closeExpand = () => {
    this.setState({
      expandState: false,
    });
  };

  changeSearch = (e) => {
    this.setState({
      search: e.target.value,
    });
  };

  deleteSearch = () => {
    document.querySelector(".listSearch > input").value = "";
    this.setState({
      search: "",
    });
  };

  render() {
    const noteList = this.state.noteList;
    let notes = [];

    if (noteList) {
      const reg = new RegExp(`.*${this.state.search}.*`);
      noteList.forEach((items, index) => {
        if (items.title.match(reg) || items.content.match(reg)) {
          notes.push(<Note key={index} state={items} callNote={() => this.callNote()} open={this.openExpand} setState={(e) => this.setState(e)}/>);
        }
      });
    }

    return (
      <>
        <section className="sideBar">
          <div className="sideBarTitle">
            노트
            <button onClick={this.openAdd} title="노트추가">
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
            <button onClick={this.deleteSearch}>
              <img src={close} alt="close" />
            </button>
          </div>
          <div className="noteList">{notes}</div>
        </section>
        <Add
          title="노트 추가"
          placeholder="노트 제목"
          open={this.state.addState}
          setAddState={(e) => this.setState(e)}
          callNote={() => this.callNote()}
        />
        {
          this.state.expandState ? 
          <Expand close={this.closeExpand} state={this.state.expandItem} /> : ""
        }
      </>
    );
  }
}

export default SideBarNote;
