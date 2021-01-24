import back from "../image/back.png";

function Expand(props) {
  return (
    <div className="expand">
      <div className="expandTitle">
        <span>
          <button>
            <img src={back} alt="뒤로가기" />
          </button>
        </span>
        <span></span>
      </div>
    </div>
  );
}

export default Expand;
