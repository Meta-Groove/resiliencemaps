import React from 'react';
// import * as d3 from "d3";
// so we have the board as a react component

import ConnectNodes from './naive/ConnectNodes';
import  hash from 'object-hash';

// export interface scimDartboardProps {
//   connections: Array<any>
// }

// Have to rename this file so can use standard conventiosn when oncluding TS
// https://fettblog.eu/typescript-react/components/

const SCIMDartboard = (props) => {
  console.log('these are props dart', props)
  // console.log('bbboxes', boxes)
  const defaultStroke = 'black';
  const defaultStrokeWidth = '3';
  const defaultScale = 1000;
  const defaultCenter = defaultScale / 2;

  // if (connects.length === 0) {
  //   connections = new Array()
  // };
  //
  // connectNodes


  // setState object
  const theIndividual = {
    strokeColor:'black',
  }


  // fix this ...
  // index.js:1 Warning: Each child in a list should have a unique "key" prop.
  //
  // Check the render method of `Container`. See https://fb.me/react-warning-keys for more information.
  //     in div (at Container.tsx:155)
  //     in Container (at Example.tsx:13)

  // generate links inside of svg grab them here...
  // console.log('where is it', connections)

  // if (connections && connections.length > 0) {
  //   connections.forEach(() => {
  //
  //   })
  // }



  // fab!!!! cycle through these and then we have our connectors...
  // then we can create a thing to draw them....

  return (
    <div>
      {/*<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">*/}
      {/*  <g fill="#61DAFB">*/}
      {/*    <path d="M666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9V78c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6V78.5c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zM421.2 430c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24 4.7 8 9.5 15.8 14.4 23.4zM420.7 163c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6 0-15.7 22.9-35.6 58.3-50.6 8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zM310 490c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6zM320.8 78.4z"/>*/}
      {/*    <circle cx="420.9" cy="296.5" r="45.7"/>*/}
      {/*    <path d="M520.5 78.1z"/>*/}
      {/*  </g>*/}
      {/*</svg>*/}

        {/* see if we can get to snap to canvas */}



        {/*<h1 style="color:green;">GeeksforGeeks</h1>*/}
        {/*<h4>SVG set Background Color</h4>*/}

        {/*<svg height="100" width="100">*/}
        {/*  <rect width="100%" height="100%" fill="green" />*/}
        {/*  <circle cx="50" cy="50" r="40" stroke="black"*/}
        {/*          strokeWidth="3" fill="red" />*/}
        {/*</svg>*/}
      {/* @todo swap out properties as objects so can define wih sliders and such -- can use react hooks for those */}
      {/* */}

      <svg height={1000} width={1000} border={'none'}>
        <defs>
          <radialGradient id="dartboardGradient">

          <stop offset={"0%"} stopColor={"#ffffff"}/>
            <stop offset={"20%"} stopColor={'#33cc33'}/>
            <stop offset={"100%"} stopColor="#ffffff"/>
          </radialGradient>
        </defs>


        <circle className="bgGradient" cx={defaultCenter} cy={defaultCenter} r="360" fill="none" fill={"url(#dartboardGradient)"} />

        <circle className="theIndividual" cx={defaultCenter} cy={defaultCenter} r="80" fill="white" stroke={defaultStroke} strokeWidth={defaultStrokeWidth} />
        <circle className="thePerson" cx={defaultCenter} cy={defaultCenter} r="120" fill="none" stroke={defaultStroke} strokeWidth={defaultStrokeWidth} />
        <circle className="theHome" cx={defaultCenter} cy={defaultCenter} r="160" fill="none" stroke={defaultStroke} strokeWidth={defaultStrokeWidth} />
        <circle className="theVillage" cx={defaultCenter} cy={defaultCenter} r="200" fill="none" stroke={defaultStroke} strokeWidth={defaultStrokeWidth} />
        <circle className="theTown" cx={defaultCenter} cy={defaultCenter} r="240" fill="none" stroke={defaultStroke} strokeWidth={defaultStrokeWidth} />
        <circle className="theRegion" cx={defaultCenter} cy={defaultCenter} r="280" fill="none" stroke={defaultStroke} strokeWidth={defaultStrokeWidth} />
        <circle className="theCountry" cx={defaultCenter} cy={defaultCenter} r="320" fill="none" stroke={defaultStroke} strokeWidth={defaultStrokeWidth} />
        <circle className="theWorld" cx={defaultCenter} cy={defaultCenter} r="360" fill="none" stroke={defaultStroke} strokeWidth={defaultStrokeWidth} />

        {/* style={{fill: "#dartboardGradient"}}*/}



        {/* maybe add invisible outer */}

        <line className="horizontalDivider" x1="100" y1="500" x2="900" y2="500" stroke="green" strokeWidth="5" />
        {/*<line className="verticalDivider" x1="500" y1="100" x2="500" y2="900" stroke="green" strokeWidth="5" />*/}
        <line className="eastAngleDivider" x1="200" y1="200" x2="800" y2="800" stroke="green" strokeWidth="5" />
        <line className="westAngleDivider" x1="200" y1="800" x2="800" y2="200" stroke="green" strokeWidth="5" />




        {/* hmm these should be percentages */}
        {/* ways to die */}
        {/*can we wrap all in a default font size to carry on ot children */}
        <text x="500" y="100" fontSize="2em" textAnchor="middle">injury</text>
        <text x="500" y="900" fontSize="2em" textAnchor="middle">hunger</text>
        <text x="100" y="700" fontSize="2em" textAnchor="middle">thirst</text>
        <text x="900" y="700" fontSize="2em" textAnchor="middle">too cold</text>
        <text x="900" y="300" fontSize="2em" textAnchor="middle">too hot</text>
        <text x="100" y="300" fontSize="2em" textAnchor="middle">illness</text>




        {/* dupe edit for consistency */}
        <circle className="theIndividual" cx={defaultCenter} cy={defaultCenter} r="80" fill="white" stroke={defaultStroke} strokeWidth={defaultStrokeWidth} />

        <text x="500" y="505" fontSize="2em" textAnchor="middle">Individual</text>
        <text x="500" y="405" fontSize="1em" textAnchor="middle">Person</text>
        <text x="500" y="365" fontSize="1em" textAnchor="middle">Home</text>
        <text x="500" y="325" fontSize="1em" textAnchor="middle">Village</text>
        <text x="500" y="285" fontSize="1em" textAnchor="middle">Town</text>
        <text x="500" y="245" fontSize="1em" textAnchor="middle">Region</text>
        <text x="500" y="205" fontSize="1em" textAnchor="middle">Country</text>
        <text x="500" y="165" fontSize="1em" textAnchor="middle">World</text>

        {/*{Object.keys(boxes).map((key) => {*/}

        {/*<text x="0" y="0" font-size="2em" text-anchor="middle">Individual</text>*/}
        {/*<text x="0" y="0" font-size="2em" text-anchor="middle">Individual</text>*/}
        {/*<text x="0" y="0" font-size="2em" text-anchor="middle">Individual</text>*/}
        {/*<text x="0" y="0" font-size="2em" text-anchor="middle">Individual</text>*/}
        {/*<text x="0" y="0" font-size="2em" text-anchor="middle">Individual</text>*/}
        {/*<text x="0" y="0" font-size="2em" text-anchor="middle">Individual</text>*/}
        {/*<text x="0" y="0" font-size="2em" text-anchor="middle">Individual</text>*/}

      {/* spectrum of regions */}
      {/* how do we get visual harmony */}

        <text x="500" y="100" fontSize="2em" textAnchor="middle">injury</text>



        {/* *@todo this hsoujld be a hash.... connections i snot used/ */}
        <ConnectNodes key={hash('connectNodes'+props.boxes)} boxes={props.boxes}/>

      </svg>
        {/*<line x1={connections[0].x1} y1={connections[0].y1} x2={connections[0].x2} y2={connections[0].y2} stroke="blue" strokeWidth="20" />*/}





      {/*<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="300px" height="200px">*/}
      {/*	<line x1={500} y1={500} x2="1" y2="1" stroke="blue" strokeWidth="20" />*/}
      {/*</svg>*/}

      {/*<ConnectNodes connections={props.connections} boxes={props.boxes}/>*/}


    </div>
  );
}
// export interface BoxProps {
//   nodeConnections?: Array<any>
//   // id: any
//   // left: number
//   // top: number
//   // hideSourceOnDrag?: boolean
//   // connectedTo?: Array<any> // should probably generate a hash and also need to tidy up all the promiscuous anys...
// }

export default SCIMDartboard;