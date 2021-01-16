function Table(props) {
  return (
    <div className="table">
      <div className="tableTitle">{props.title}</div>
      <div className="tableContent">{props.content}</div>
    </div>
  );
}

export default Table;
