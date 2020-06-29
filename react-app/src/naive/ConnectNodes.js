// wtf, things seem ok.. value all seem to be correct but nothing is being returned...



import React from 'react';
import {Box} from "./Box";
import  hash from 'object-hash';

import DrawALine from "./DrawALine";

export default function DrawAline(props) {

  // should we be using state
  console.log('wtf', props)

  // just derive this from the box and then it should move around even if it doesnt get data on first run...
  const connection = [{
    x1: props.boxes.powerStation.left,
    y1: props.boxes.powerStation.top,
    x2: props.boxes.police.left,
    y2: props.boxes.police.top
  }]



  console.log('grrrrr', connection[0].y2)


  // so actually what we want is an array.....

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

  console.log('lc', lineCoords)


  // should probably be done before hand
  // aaaaarrrggghhhhh, what is going on with assignment here. ffs. put it down and pick it up again later.
  // just need an extra layer of iteration and we're done -- this would defo be much better as arrays... then
  // dont have to kill elements -- which in themselves might cause problems later.
  // do we just need a conditional here for return null or ....?


return (
  <svg key={hash(lineCoords)} xmlns="http://www.w3.org/2000/svg" version="1.1" width="1000px" height="1000px">

    ({ Object.keys(lineCoords).map((key) => {
      return Object.keys(lineCoords[key]).map((i) => {
        console.log('before render', lineCoords[key][i][0])

        return (

          <div className="aConnection">
              <DrawALine
                x1={lineCoords[key][i][0]}
                y1={lineCoords[key][i][1]}
                x2={lineCoords[key][i][2]}
                y2={lineCoords[key][i][3]} // this is kinda horrific. refactor.
              />
          </div>
        )
      })
      // {console.log('m', lineCoords[key])}

      })}
    </svg>
)
  // )
    //)
}

