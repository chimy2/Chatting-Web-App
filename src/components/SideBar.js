import add from '../image/sidebar_add.png';
import search from '../image/sidebar_search.png';
import close from '../image/sidebar_close.png';
import basicProfile from '../image/basic_profile.png';

function SideBar() {
    return(
        <section className="sideBar">
            <div className="friendTitle">
                친구창
                <img src={add} alt="add"/>
            </div>
            <div className="friendSearch">
                <img src={search} alt="search"/>
                <input type="text" placeholder="친구이름 검색"/>
                <img src={close} alt="close"/>
            </div>
            <div className="friendProfile">
                <FriendList/>
                <hr/>
                <FriendList/>
                <FriendList/>
                <FriendList/>
                <FriendList/>
                <FriendList/>
                <FriendList/>
            </div>
        </section>
    )
}

function FriendList() {
    return(
        <div className="friendList">
            <img src={basicProfile} alt="profile image"/>
            <div className="friendListInfo">
                <div className="friendListName">이름</div>
                <div className="friendListState">메세지</div>
            </div>
        </div>
    )
}

export default SideBar;