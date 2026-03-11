import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

//importing components
import StartMenu from "./components/StartMenu";
import Question from "./components/Question";

function App() {
  const [started, setStarted] = useState(false);
  return (
    <div className="main-container container-fluid">
      {!started && <StartMenu started={started} setStarted={setStarted} />}
      {started && <Question />}
    </div>
  );
}

export default App;
