import React from 'react';
import './App.css';
import dartboardExample from './img/dartboardExample.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd';
import {useRoutes} from 'hookrouter';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { useParams} from "react-router";
import SCIMDartboard from './ScimDartboard';
// maybe actually we dont even need d3....


// CAULCATE INTERSECTIONS TO PROVIDE DROP POINTS...
// REVIEW DOM INTEGATAION AND RECACT --- WHATS THE BEST MOST FLEXIBLE WAY TO APPROACH THIS...
// CHECK STUFF IN ANGLES SO WE CAN GET DIVIDED NICELY


// could wither go for a pure svg that keeps it simple and then integrate the dnd stuff...

// Or could do everything in d3....

// both in common they share the fact that we need an svg regardless of what path is taken
// we could use illustrator but that would end up with soem ting quite complex



import {Example} from './naive/Example';
//
//
// import React, { useState, useCallback } from 'react'
// import { Container } from './Container'
//
// export const Example: React.FC = () => {
//   const [hideSourceOnDrag, setHideSourceOnDrag] = useState(true)
//   const toggle = useCallback(() => setHideSourceOnDrag(!hideSourceOnDrag), [
//     hideSourceOnDrag,
//   ])
//
//   return (
//     <div>
//       <Container hideSourceOnDrag={hideSourceOnDrag} />
//       <p>
//         <label htmlFor="hideSourceOnDrag">
//           <input
//             id="hideSourceOnDrag"
//             type="checkbox"
//             checked={hideSourceOnDrag}
//             onChange={toggle}
//           />
//           <small>Hide the source item while dragging</small>
//         </label>
//       </p>
//     </div>
//   )
// }


// make something that is static





import { useDrag } from 'react-dnd'

// consider ux and icons
// interesting to see how we could shuffle these elements around?

// so we need to wrap this around...
const routes = {
  '/': () => <Example />,
  '/:id': ({id}) => <Example id={id} />,
  // '/view/:id': ({id}) => <Example id={id} />,
  // '/edit/:id': ({id}) => <Example id={id} />,
};


// Enable both point and touch
const backend = (window.matchMedia("(pointer: coarse)").matches) ? TouchBackend : HTML5Backend

function App() {

  const routeResult = useRoutes(routes).props.id;
  console.log('routeResult', routeResult)


  return (
      <DndProvider backend={backend}>

    {/*<div>*/}
    {/*<div className="App" style={{backgroundImage: 'url("../img/dartboardExample")'}}>*/}
    {/*  <div className="App" style={{backgroundImage: 'url("../img/dartboardExample")'}}>*/}
    {/*  <Router>*/}
    {/*    <Route path={'/'} component={Container} />*/}
    {/*    <Route path={'/:ipfsHash'} component={Container} />*/}


      <Example ipfsId={routeResult} />
      {/*<SCIMDartboard />*/}
      {/*<header className="App-header">*/}
      {/*  <p>*/}
      {/*    Initial prototype of editable resilience map*/}
      {/*  </p>*/}
      {/*</header>*/}
      {/*<Container>*/}
      {/*  <Row>*/}
      {/*    <Example/>*/}
      {/*    <Col>@todo List of items that may be dragged on to image</Col>*/}
      {/*    <Col>*/}
      {/*      <img src={dartboardExample} className="dartboard-example" alt="dartboard resilience map" />*/}
      {/*    </Col>*/}
      {/*  </Row>*/}
      {/*</Container>*/}
    {/*</Router>*/}
    {/*</div>*/}
    {/*</div>*/}
    {/*  </Router>*/}
      </DndProvider>

  );
}

export default App;



// import React from 'react'
// import ReactDOM from 'react-dom'
// import Example from './example'
// import { DndProvider } from 'react-dnd'
// import { HTML5Backend } from 'react-dnd-html5-backend'

// function App() {
//   return (
//     <div className="App">
//       <DndProvider backend={HTML5Backend}>
//         <Example />
//       </DndProvider>
//     </div>
//   )
// }

// const rootElement = document.getElementById('root')
// ReactDOM.render(<App />, rootElement)
