import { useState, useEffect } from "react";

function Calendar() {
  const [holiday, setHoliday] = useState();
  const [content, setContent] = useState();
  const [expand, setExpand] = useState();
  useEffect(() => {
    callApi("/calendar").then(setHoliday);
    const now= new Date();
    let calendar = [];
    const day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let days = [];
    console.log(now);
    

    console.log(now.getMonth(),now.getDate());
    for(let i=0;i<day.length;i++){
      days.push([]);
      for(let j=1;j<=day[i];j++){
        if(now.getMonth()===i && now.getDate()===j){
          console.log("엥");
          days[i].push(<div id="today" key={j}>{j}</div>);
        } else {
          days[i].push(<div key={j}>{j}</div>);
        }
      }
    }

    for(let i=1;i<=day.length;i++){
      calendar.push(
        <div className="calendar" key={i}>
          <div className="calendarTitle">{i}월</div>
          <div className="calendarContent">
            {days[i-1]}
          </div>
        </div>
      );
    }
    setContent(calendar);
  }, [expand]);

  const makeContent = () => {
    console.log(holiday);
    return "=======";
  };

  const callApi = async (address) => {
    const response = await fetch(`/api${address}`);
    const body = await response.json();
    return body;
  };

  return <>{content ? content : ""}</>;
}

export default Calendar;
