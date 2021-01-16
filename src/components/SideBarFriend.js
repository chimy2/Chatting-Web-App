import React from "react";
import List from "./List";
import Add from "./Add";
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

  addOpen = () => {
    this.setState({
      addState: true,
    });
  };

  changeSearch = (e) => {
    this.setState({
      search: e.target.value,
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
          <div className="subTitle" key="length">
            요청목록({reqList.length})
          </div>,
        );
        reqList.forEach((items, index) => {
          requests.push(
            <List
              key={index}
              state={items}
              request
              callFriend={() => this.callFriend()}
            />,
          );
        });
      }
    }

    if (friList) {
      friends.push(
        <div className="subTitle" key="length">
          친구목록({friList.length})
        </div>,
      );
      friList.forEach((items, index) => {
        const reg = new RegExp(`.*${this.state.search}.*`);
        if (
          (items.nickname && items.nickname.match(reg)) ||
          (!items.nickname && items.name.match(reg))
        ) {
          friends.push(<List key={index} state={items} />);
        }
      });
    }

    return (
      <>
        <section className="sideBar">
          <div className="sideBarTitle">
            친구창
            <button onClick={this.addOpen}>
              <img src={add} alt="add" />
            </button>
          </div>
          <div className="listSearch">
            <img src={search} alt="search" />
            <input type="text" placeholder="친구이름 검색" onChange={this.changeSearch} />
            <img src={close} alt="close" />
          </div>
          <div className="friendProfile">
            <List state={this.state.myProfile} />
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
      </>
    );
  }
}

export default SideBarFriend;
