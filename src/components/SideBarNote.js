import add from '../image/add.png';
import search from '../image/note_search.png';
import close from '../image/sidebar_close.png';
import basicProfile from '../image/basic_profile.png';
import List from './List';

function SideBarNote() {
    return(
        <section className="sideBar">
            <div className="sideBarTitle">
                노트
                <img src={add} alt="add"/>
            </div>
            <div className="listSearch">
                <img src={search} alt="search"/>
                <input type="text" placeholder="노트 제목/내용 검색"/>
                <img src={close} alt="close"/>
            </div>
        </section>
    )
}

export default SideBarNote;