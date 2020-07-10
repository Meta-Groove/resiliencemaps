import React from 'react';
import {Box} from "./Box";
import  hash from 'object-hash';

export default function ConnectNodes(props) {

  const lineCoords = Object.keys(props.boxes).map((key) => {
    if (props.boxes[key].hasOwnProperty('connectedTo')) {
      const items = props.boxes[key].connectedTo.map((item) => {
        // console.log([props.boxes[key].left, props.boxes[key].top, props.boxes[item].left, props.boxes[item].top])
        return [props.boxes[key].left, props.boxes[key].top, props.boxes[item].left, props.boxes[item].top]
      })
      return items
    }
  })

  Object.keys(lineCoords).forEach(key => lineCoords[key] === undefined && delete lineCoords[key])

return (
  <svg key={'svg'+hash(lineCoords)} xmlns="http://www.w3.org/2000/svg" version="1.1" width="1000px" height="1000px">

    ({ Object.keys(lineCoords).map((key) => {
      return Object.keys(lineCoords[key]).map((i) => {
        // console.log('before render', lineCoords[key][i][0])

        return (
          <line
            key = {hash(props)}
            x1={lineCoords[key][i][0]+5}
            y1={lineCoords[key][i][1]+20}
            x2={lineCoords[key][i][2]+5}
            y2={lineCoords[key][i][3]+20}
            stroke="black"
            strokeWidth="5"
            strokeLinecap="butt"
          />
        )
      })

      })}
    </svg>
) || null //!?

}

