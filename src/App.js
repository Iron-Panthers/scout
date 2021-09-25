import React from 'react';
import './App.css';
import { Panels } from './components/Panels';

import { Provider } from "./state.jsx"

function App() {

  return (
    <div className="App">
      <Provider>
        <Panels></Panels>
      </Provider>
    </div>
  )
}

export default App;
