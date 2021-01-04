import basicProfile from "../image/basic_profile.png";

function List(props) {
  const addFriend = (id) => {
    callApi("/friend/add");
  };

  const callApi = async (address, content) => {
    const response = await fetch(`/api${address}`, content);
    const body = await response.json();
    return body;
  };

  return (
    <div className="list">
      <img src={props.state.image ? props.state.image : basicProfile} alt={props.state.name} />
      <div className="listInfo">
        <div className="listName">{props.state.nickname ? props.state.nickname : props.state.name}</div>
        <div className="listState">{props.state.message}</div>
      </div>
      {props.add ? (
        <button className="listAddButton" onClick={addFriend(props.state.id)}>
          추가
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default List;
