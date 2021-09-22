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
  const panelProps = {
    data,
    setData,
    nextMode
  }
  let panel
  if (mode === "Configure") {
    panel = <Configure {...panelProps}></Configure>
  }
  return (
    <div className="App">
      {
        panel
      }
    </div>
  );
}

export default App;
