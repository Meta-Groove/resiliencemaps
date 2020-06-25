import ReactRough, { Rectangle, Line } from 'react-rough';
import React from 'react';

export function DrawStuff() {
 return (
  <ReactRough>
    <Rectangle x={15} y={15} width={90} height={80} fill="red" />

    <Line x1={15} y1={15} x2={80} y2={80} fill="blue" />
    <p>test in here</p>

    {/*{{children}}*/}
  {/*  can draw a line with this */}
  </ReactRough>
 )
};

// could take the existing ones....



// import React, { useState } from 'react';
//
// function Example() {
//   // Declare a new state variable, which we'll call "count"
//   // const [count, setCount] = useState(0);
//
//   return (
//     <div>
//       <p>Hello World</p>
//       {/*<p>You clicked {count} times</p>*/}
//       {/*<button onClick={() => setCount(count + 1)}>*/}
//       {/*  Click me*/}
//       {/*</button>*/}
//     </div>
//   );
// }