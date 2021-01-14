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
    }).then((res) => {
      if (res.status === 201) {
        alert("친구 요청에 성공했습니다");
      } else {
        alert("친구 요청에 실패했습니다");
      }
      props.addClose();
    });
  };

  const responseFrined = (e) => {
    callApi("/friend/response", {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        reqId: e.target.value,
        response: e.target.textContent === "수락" ? true : false,
      }),
    }).then(props.callFriend());
  };

  const callApi = async (address, content) => {
    const response = await fetch(`/api${address}`, content);
    return response;
  };

  return (
    <div className="list">
      <img
        src={props.state.image ? props.state.image : basicProfile}
        alt={props.state.name}
      />
      <div className="listInfo">
        <div className="listName">
          {props.state.nickname ? props.state.nickname : props.state.name}
        </div>
        <div className="listState">{props.state.message}</div>
      </div>
      {props.add ? (
        <button className="listButton" value={props.state.id} onClick={addFriend}>
          요청
        </button>
      ) : (
        ""
      )}
      {props.request ? (
        <>
          <button
            className="listResButton"
            value={props.state.id}
            onClick={responseFrined}
          >
            수락
          </button>
          <button
            className="listResButton"
            value={props.state.id}
            onClick={responseFrined}
          >
            거절
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default List;
