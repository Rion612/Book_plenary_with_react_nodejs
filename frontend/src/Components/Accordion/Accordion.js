import React, { useState } from "react";
import "./accordio.scss";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";

const Accordion = (props) => {
  const [state, setState] = useState(props.status);
  return (
    <div className="accordioDiv">
      <div className="accordionHead">
        <div className="aheadContent">
          <div>{props.icon}</div>
          <div className="accorHeading">{props.headtitle}</div>
        </div>
        <div className="downIcon" onClick={() => setState(!state)}>
          {state ? (
            <AiOutlineDown size={20} color={"grey"} />
          ) : (
            <AiOutlineUp size={20} color={"grey"} />
          )}
        </div>
      </div>
      <div className={state ? "accorBodyActive" : "accorBodyDisable"}>
        {props.children}
      </div>
    </div>
  );
};

export default Accordion;
