import React from 'react';
import add from '../image/sidebar_add.png';
import search from '../image/sidebar_search.png';
import close from '../image/sidebar_close.png';
import basicProfile from '../image/basic_profile.png';
import List from './List';

class SideBarFriend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myProfile: [],
            requestList: [],    
            friendList: []
        };
    }

    componentDidMount() {
        this.callApi()
            .then(res => res[0])
            .then(res => {
                this.setState({
                    myProfile: {
                        name: res.name,
                        nickname: res.nickname,
                        image: res.image === null ? basicProfile : res.image,
                        message: res.message
                    }
                });
            })
            .catch(console.log);
    }
    
    callApi = async () => {
        const response = await fetch('/api/friend/list');
        const body = await response.json();
        return body;
    }

    render() {
        return(
            <section className="sideBar">
                <div className="sideBarTitle">
                    친구창
                    <img src={add} alt="add"/>
                </div>
                <div className="listSearch">
                    <img src={search} alt="search"/>
                    <input type="text" placeholder="친구이름 검색"/>
                    <img src={close} alt="close"/>
                </div>
                <div className="friendProfile">
                    <List state={this.state.myProfile}/>
                    <hr/>
                    <List state={this.state.friendList}/>
                    <List state={this.state.friendList}/>
                    <List state={this.state.friendList}/>
                    <List state={this.state.friendList}/>
                    <List state={this.state.friendList}/>
                    <List state={this.state.friendList}/>
                    <List state={this.state.friendList}/>
                </div>
            </section>
        )
    }
}

export default SideBarFriend;