import { useState, useEffect } from "react";
import Expand from './Expand';

function Calendar(props) {
  const [holiday, setHoliday] = useState();
  const [content, setContent] = useState();

  useEffect(() => {
    callApi("/calendar").then(makeHoliday).then(setHoliday);
    setContent(makeContent);
  }, []);

  const openExpand = (month, day, length) => {
    props.setExpand([month, day, length]);
  }

  const makeContent = () => {
    const now = new Date();
    let week = new Date(`${now.getFullYear()}-1-1`).getDay();
    let calendar = [];
    let days = [];
    const day = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // 일자 배열 만들기
    for (let i = 0;i < day.length; i++) {
      days.push([]);
      if (week !== 0) {
        for (let j = 0; j < week; j++) {
          days[i].push(<div key={j}></div>);
        }
      }
      for (let j = 1; j <= day[i]; j++) {
        if (now.getMonth() === i && now.getDate() === j) {
          days[i].push(<div id="today" key={i + "-" + j}>{j}</div>);
        } else {
          days[i].push(<div key={i + "-" + j}>{j}</div>);
        }
      }
      week = (week + day[i]) % 7;
    }

    // 전체 달력 만들기
    for (let i = 1; i <= day.length; i++) {
      calendar.push(
        <div className="calendar" key={i} onClick={() => openExpand(i, days[i - 1][days[i-1].length-1], days[i-1].length)}>
          <div className="calendarTitle">{i}월</div>
          <div className="calendarContent">{days[i - 1]}</div>
        </div>,
      );
    }
    return calendar;
  };

  const makeHoliday = (arr) => {
    const solar = new Date("2021-1-1");
    const lunar = new Date("2020-11-18");
    // console.log(solar, lunar);
    // console.log(arr);
    // * 양력 / 음력 변환하기 전 준비 사항
    // 1) 음력 월별 대소월 구분 - 한국천문연구원(http://www.kasi.re.kr) 참고
    // 2) 윤달 정보와 윤달의 대소월 구분  - 한국천문연구원(http://www.kasi.re.kr) 참고
    // 3) 특정 기준일의 음력과 양력 차이 일수(예> 1881년 1월 1일은 29일 차이: 양력 1월 30일이 음력 1월 1일)

    // * 양력을 음력으로 변환하기
    // 1) 특정 기준일과 변환 대상일의 양력 일 수를 구한다.
    // 2) 1의 양력 일 수에서  기준일의 음력연도의 일수를 감하며 음력 년도를 증가한다.(단, 연도보다 일 수 가 적으면 중단)
    // 3) 2의 남은 일수에서 2의 음력 년도의 월수만큼 씩 감하여 음력 월을 증가한다.
    // 4) 3에서 남은 일수를 음력의 일수로 하여 음력일자를 구한다.

    // * 음력을 양력으로 변환하기
    // 위의 양력을 음력으로 변환하기 공식의 반대로 계산한다.

    return arr;
  };

  const callApi = async (address) => {
    const response = await fetch(`/api${address}`);
    const body = await response.json();
    return body;
  };

  return (
    <>
      {content ? content : ""}
    </>
    );
}

export default Calendar;
