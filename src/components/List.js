import basicProfile from "../image/basic_profile.png";

function List(props) {
  const addFriend = (e) => {
    // 이벤트 전파로 preventDefault
    e.preventDefault();
    callApi("/friend/request", {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        resId: e.target.value,
      }),
    }).then(console.log);
  };

  const callApi = async (address, content) => {
    const response = await fetch(`/api${address}`, content);
    const chunk = response;
    console.log(1, chunk);
    const body = await response.json();
    return body;
  };

  return (
    <div className="list">
      <img src={props.state.image ? props.state.image : basicProfile} alt={props.state.name} />
      <div className="listInfo">
        <div className="listName">
          {props.state.nickname ? props.state.nickname : props.state.name}
        </div>
        <div className="listState">{props.state.message}</div>
      </div>
      {props.add ? (
        <button className="listAddButton" value={props.state.id} onClick={addFriend}>
          요청
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default List;
