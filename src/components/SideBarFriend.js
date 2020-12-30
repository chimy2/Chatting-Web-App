import React from 'react';
import List from './List';
import Add from './Add';
import add from '../image/sidebar_add.png';
import search from '../image/sidebar_search.png';
import close from '../image/sidebar_close.png';

class SideBarFriend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myProfile: [],
            requestList: [],    
            friendList: [],
            addState: false
        };
    }

    componentDidMount() {
        this.callApi('profile')
            .then(res => res[0])
            .then(res => {
                this.setState({
                    myProfile: {
                        name: res.name,
                        nickname: res.nickname,
                        image: res.image,
                        message: res.message
                    }
                });
            });
        this.callApi('friend')
            .then(res => {
                this.setState({
                    friendList: res
                });
            });
    }
    
    callApi = async (address) => {
        const response = await fetch(`/api/friend/${address}`);
        const body = await response.json();
        return body;
    }

    addOpen = () => {
        this.setState({
            addState: true
        });
    }

    render() {
        return(
            <>
                <section className="sideBar">
                    <div className="sideBarTitle">
                        친구창
                        <a onClick={this.addOpen}>
                            <img src={add} alt="add"/>
                        </a>
                    </div>
                    <div className="listSearch">
                        <img src={search} alt="search"/>
                        <input type="text" placeholder="친구이름 검색"/>
                        <img src={close} alt="close"/>
                    </div>
                    <div className="friendProfile">
                        <List state={this.state.myProfile}/>
                        <hr/>
                        {
                            this.state.friendList ?
                                this.state.friendList.map((items, index) => {
                                    return <List key={items.id} state={items}/>
                                }) 
                                : ""
                        }
                    </div>
                </section>
                <Add 
                    title="친구 추가"
                    open={this.state.addState} setAddState={(e) => this.setState(e)}
                />
            </>
        )
    }
}

export default SideBarFriend;