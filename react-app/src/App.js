import React from 'react';
import './App.css';
import dartboardExample from './img/dartboardExample.png';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import {Example} from './naive/Example';

import { useDrag } from 'react-dnd'

// add draggables
// add default data
// add ability to create new draggable elements
// add local storage to remember
// switch out graphic for d3
// hook up draggables to d3
// get some feedback
// consider ux and icons

function App() {
  return (
      <DndProvider backend={HTML5Backend}>

    <div className="App">
      {/*<header className="App-header">*/}
      {/*  <p>*/}
      {/*    Initial prototype of editable resilience map*/}
      {/*  </p>*/}
      {/*</header>*/}
      <Container>
        <Row>
          <Example/>
          <Col>@todo List of items that may be dragged on to image</Col>
          <Col>
            <img src={dartboardExample} className="dartboard-example" alt="dartboard resilience map" />
          </Col>
        </Row>
      </Container>
    </div>
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
