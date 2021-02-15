import { useState, useEffect } from "react";

function Note(props) {
  let { noteId, title, content, date } = props.state;
  const [click, setClick] = useState(0);

  const setDate = () => {
    const originalDate = new Date(props.state.date);
    let fullDate = `${originalDate.getFullYear().toString().slice(2, 4)}. `;
    fullDate += `${originalDate.getMonth() + 1}. `;
    fullDate += `${originalDate.getDate()} `;
    fullDate += `${originalDate.getHours()}:`;
    fullDate += `${
      originalDate.getMinutes() > 9
        ? originalDate.getMinutes()
        : "0" + originalDate.getMinutes()
    }`;
    date = fullDate;
  };
  setDate();

  useEffect(() => {
    if (click === 0) return;
    const timer = setTimeout(() => {
      if (click === 1) {
        props.open();
      } else {
        if (window.confirm("해당 노트를 삭제하시겠습니까?")) {
          fetch("/api/note", {
            method: "delete",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              noteId: props.state.noteId,
            }),
          }).then((res) => {
            props.callNote();
          });
        }
      }
      setClick(0);
    }, 200);

    return () => clearTimeout(timer);
  }, [click, props]);

  const eventClick = (e) => {
    // e.preventDefault();
    const node = e.currentTarget.childNodes;
    props.setState({
      expandItem: { noteId, title, content, date },
    });
    setClick(click + 1);
  };

  return (
    <div className="note" onClick={eventClick}>
      <div className="noteTitle">{title}</div>
      <div className="noteContent">{content}</div>
      <div className="noteDate">{date}</div>
    </div>
  );
}

export default Note;
