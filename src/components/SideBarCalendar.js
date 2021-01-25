import Calendar from "./Calendar";

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
    </>
  );
}

export default SideBarCalendar;
