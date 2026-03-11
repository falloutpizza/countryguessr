import React, { useState } from "react";

export default function Question({ country, nextQuestion }) {
  const [hint1, setHint1] = useState("hint #1");
  const [hint2, setHint2] = useState("hint #2");
  const [hint3, setHint3] = useState("hint #3");

  return (
    <div className="row">
      <div className="count-image-container col">
        <img src={country.image} className="count-image" />
      </div>
      <div className="count-hints-container col">
        <h2 className="guess-text">guess the country!</h2>
        <button className="hint-button" onClick={() => setHint1(country.hint1)}>
          <span className="hint-text">{hint1}</span>
        </button>
        <button className="hint-button" onClick={() => setHint2(country.hint2)}>
          <span className="hint-text">{hint2}</span>
        </button>
        <button className="hint-button" onClick={() => setHint3(country.hint3)}>
          <span className="hint-text">{hint3}</span>
        </button>
      </div>
    </div>
  );
}
