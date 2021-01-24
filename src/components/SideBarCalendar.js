import Calendar from "./Calendar";
import Expand from "./Expand";

function SideBarCalendar() {
  return (
    <>
      <section className="sideBar">
        <div className="sideBarTitle">달력</div>
        <hr />
        <div className="sideBarContent">
          <Calendar />
        </div>
      </section>
      <Expand />
    </>
  );
}

export default SideBarCalendar;
