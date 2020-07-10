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

  // setState object
  const theIndividual = {
    strokeColor:'black',
  }


  return (
    <div>

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

        <text x="500" y="100" fontSize="2em" textAnchor="middle">injury</text>



        {/* *@todo this hsoujld be a hash.... connections i snot used/ */}
        <ConnectNodes key={hash('connectNodes'+props.boxes)} boxes={props.boxes}/>

      </svg>

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