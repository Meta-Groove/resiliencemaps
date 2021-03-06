import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider } from 'react-dnd';
import {useRoutes} from 'hookrouter';
import {Example} from './naive/Example';

const routes = {
  '/': () => <Example />,
  '/:id': ({id}) => <Example id={id} />,
  // '/view/:id': ({id}) => <Example id={id} />,
  // '/edit/:id': ({id}) => <Example id={id} />,
};

// Enable pointer or touch
const backend = (window.matchMedia("(pointer: coarse)").matches) ? TouchBackend : HTML5Backend

function App() {

  const routeResult = useRoutes(routes).props.id;
  console.log('routeResult', routeResult)

  return (
      <DndProvider backend={backend}>
        <Example ipfsId={routeResult} />
      </DndProvider>

  );
}

export default App;
