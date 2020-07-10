import React from "react";
import hash from 'object-hash';

export default function DrawALine(props) {

  return (
    // <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="1000px" height="1000px">
      <line
        key = {hash(props)}
        x1={props.x1}
        y1={props.y1}
        x2={props.x2}
        y2={props.y2}
        stroke="black"
        strokeWidth="5"
        strokeLinecap="butt"
      />
  )
}



