function Note(props) {
  const deleteNote = (e) => {
    e.preventDefault();
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
        console.log(res);
        props.callNote();
      });
    }
  };

  const date = () => {
    const originalDate = new Date(props.state.date);
    let fullDate = `${originalDate.getFullYear()}. `;
    fullDate += `${originalDate.getMonth() + 1}. `;
    fullDate += `${originalDate.getDate()} `;
    fullDate += `${originalDate.getHours()}:`;
    fullDate += `${
      originalDate.getMinutes() > 9
        ? originalDate.getMinutes()
        : "0" + originalDate.getMinutes()
    }`;
    return fullDate;
  };

  return (
    <div className="note" onDoubleClick={deleteNote}>
      <div className="noteTitle">{props.state.title}</div>
      <div className="noteContent">{props.state.content}</div>
      <div className="noteDate">{date()}</div>
    </div>
  );
}

export default Note;
