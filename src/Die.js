import React from "react";

function Die(props) {
  return (
    <div
      className={props.isHeld ? "isHeld die" : "die"}
      onClick={() => {
        props.holdDice(props.id);
      }}
    >
      <h2>{props.value}</h2>
    </div>
  );
}

export default Die;
