import React from "react";
import List from "./List";
import Add from "./Add";
import Expand from "./Expand";
import add from "../image/sidebar_add.png";
import search from "../image/sidebar_search.png";
import close from "../image/sidebar_close.png";

class SideBarFriend extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myProfile: [],
      search: "",
      requestList: [],
      friendList: [],
      addState: false,
      expandState: false,
      expandItem: [],
    };
  }

  componentDidMount() {
    this.callApi("profile")
      .then((res) => res[0])
      .then((res) => {
        this.setState({
          myProfile: {
            name: res.name,
            nickname: res.nickname,
            image: res.image,
            message: res.message,
          },
        });
      });
    this.callFriend();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log(prevProps);
    // console.log('state',this.state);
    // console.log(prevState);
    // console.log(snapshot);
    // if(prevState.expandState!==this.state.expandState){
    //   if(!this.state.expandState){
    //     this.setState({
    //       expandItem: []
    //     });
    //   }
    // }
  }

  callFriend = () => {
    this.callApi("request").then((res) => {
      this.setState({
        requestList: res,
      });
    });
    this.callApi("friend").then((res) => {
      this.setState({
        friendList: res,
      });
    });
  };

  callApi = async (address) => {
    const response = await fetch(`/api/friend/${address}`);
    const body = await response.json();
    return body;
  };

  openAdd = () => {
    this.setState({
      addState: true,
    });
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
    const reqList = this.state.requestList;
    let requests = [];
    const friList = this.state.friendList;
    let friends = [];

    if (reqList) {
      if (reqList.length > 0) {
        requests.push(
          <div className="friendSubTitle" key="length">
            요청목록({reqList.length})
          </div>,
        );
        reqList.forEach((items, index) => {
          requests.push(
            <List
              key={index}
              items={items}
              request
              callFriend={() => this.callFriend()}
              open={this.openExpand}
              setState={(e) => this.setState(e)}
              state={this.state}
            />,
          );
        });
      }
    }

    if (friList) {
      friends.push(
        <div className="friendSubTitle" key="length">
          친구목록({friList.length})
        </div>,
      );
      friList.forEach((items, index) => {
        const reg = new RegExp(`.*${this.state.search}.*`);
        if (
          (items.nickname && items.nickname.match(reg)) ||
          (!items.nickname && items.name.match(reg))
        ) {
          friends.push(
            <List
              key={index}
              items={items}
              open={this.openExpand}
              setState={(e) => this.setState(e)}
              state={this.state}
            />,
          );
        }
      });
    }

    return (
      <>
        <section className="sideBar">
          <div className="sideBarTitle">
            친구창
            <button onClick={this.openAdd}>
              <img src={add} alt="add" />
            </button>
          </div>
          <div className="listSearch">
            <img src={search} alt="search" />
            <input type="text" placeholder="친구이름 검색" onChange={this.changeSearch} />
            <button onClick={this.deleteSearch}>
              <img src={close} alt="close" />
            </button>
          </div>
          <div className="friendProfile">
            <List
              items={this.state.myProfile}
              open={this.openExpand}
              setState={(e) => this.setState(e)}
              state={this.state}
            />
            {requests}
            {friends}
          </div>
        </section>
        <Add
          title="친구 추가"
          placeholder="친구 검색(ex. id, phone)"
          open={this.state.addState}
          setAddState={(e) => this.setState(e)}
        />
        {this.state.expandState ? (
          <Expand close={this.closeExpand} state={this.state.expandItem} />
        ) : (
          ""
        )}
      </>
    );
  }
}

export default SideBarFriend;
