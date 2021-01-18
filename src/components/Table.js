function Table(props) {
  const deleteNote = () => {
    alert("엥");
  };

  return (
    // <div className="table" onDoubleClick={deleteNote}>
    <div className="table">
      <div className="tableTitle">{props.title}</div>
      <div className="tableContent">{props.content}</div>
    </div>
  );
}

export default Table;
