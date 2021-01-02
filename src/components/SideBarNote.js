import { useState } from 'react';
import List from './List';
import Add from './Add';
import add from '../image/add.png';
import search from '../image/note_search.png';
import close from '../image/sidebar_close.png';
import basicProfile from '../image/basic_profile.png';

function SideBarNote() {
    const [addState, setAddState] = useState(false);
    const addOpen = () => {
        setAddState(true);
    }
    return(
        <>
            <section className="sideBar">
                <div className="sideBarTitle">
                    노트
                    <a onClick={addOpen}>
                        <img src={add} alt="add"/>  
                    </a>
                </div>
                <div className="listSearch">
                    <img src={search} alt="search"/>
                    <input type="text" placeholder="노트 제목/내용 검색"/>
                    <img src={close} alt="close"/>
                </div>
            </section>
            <Add 
                title="노트 추가" placeholder="노트 제목"
                open={addState} setAddState={setAddState}
            />
        </>
    )
}

export default SideBarNote;