import { useEffect } from "react";
import back from "../image/back.png";

function Expand(props) {
  const closeExpand = () => {
    document.querySelector(".expand").remove();
  }

  useEffect(()=>{
    closeExpand();
  }, [document.location.pathname])

  return (
    <div className="expand">
      <div className="expandTitle">
        <span>
          <button onClick={closeExpand}>
            <img src={back} alt="뒤로가기" />
          </button>
        </span>
        <span></span>
      </div>
    </div>
  );
}

export default Expand;
