import React, { useState } from 'react';
import './App.css';

import Configure from './components/Configure';





function App() {
  const [mode, setMode] = useState("Configure")
  const nextMode = () => {
    const modes = ["Configure", "Scout", "Review", "Scan"]
    if (mode !== "Scan") setMode(
      modes[modes.indexOf(mode) + 1]
    )
  }

  const [data, setData] = useState({})
  let panel
  if (mode === "Configure") {
    panel = <Configure data={data} setData={setData}></Configure>
  }
  return (
    <div className="App">
      {
        panel
      }
      <button onClick={nextMode}>{mode}</button>
    </div>
  );
}

export default App;
