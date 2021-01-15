function Table(props) {
  return (
    <div className="table">
      <div className="tableTitle">1월</div>
      <div className="tableContent">{props.content}</div>
    </div>
  );
}

export default Table;
