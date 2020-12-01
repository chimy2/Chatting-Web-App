import add from '../image/sidebar_add.png';
import search from '../image/sidebar_search.png';
import close from '../image/sidebar_close.png';
import basicProfile from '../image/basic_profile.png';
import List from './List';

function SideBarFriend() {
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
                <List image={basicProfile} name={'이름'} state={'메시지'}/>
                <hr/>
                <List image={basicProfile} name={'이름'} state={'메시지'}/>
                <List image={basicProfile} name={'이름'} state={'메시지'}/>
                <List image={basicProfile} name={'이름'} state={'메시지'}/>
                <List image={basicProfile} name={'이름'} state={'메시지'}/>
                <List image={basicProfile} name={'이름'} state={'메시지'}/>
                <List image={basicProfile} name={'이름'} state={'메시지'}/>
            </div>
        </section>
    )
}

export default SideBarFriend;