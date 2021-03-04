import { useState, useEffect } from "react";
import Calendar from "./Calendar";
import Expand from './Expand';

function SideBarCalendar() {
  const [expand, setExpand] = useState();
  // const openExpand = (month, day, length) => {
  //   setExpand([month, day, length]);
  // }
  const closeExpand = () => {
    setExpand();
  }
  return (
    <>
      <section className="sideBar">
        <div className="sideBarTitle">달력</div>
        <hr />
        <div className="sideBarContent">
          <Calendar setExpand={setExpand.bind()}/>
        </div>
      </section>
      {
        expand ? <Expand month={expand[0]} day={expand[1]} length={expand[2]} close={closeExpand.bind()}/> : ""
      }
    </>
  );
}

export default SideBarCalendar;
