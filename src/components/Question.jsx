import React, { useState } from "react";

function HintButton({ hintNum, hintTxt, clickable, setNext }) {
  const [hintText, setHintText] = useState(hintNum);
  return (
    <button
      className="hint-button"
      onClick={() => {
        setHintText(hintTxt);
        if (setNext) {
          setNext(true);
        }
      }}
      disabled={clickable ? false : true}
    >
      <span className="hint-text">{hintText}</span>
    </button>
  );
}

function Guess() {
  const [guess, setGuess] = useState("");
  function handleChange(e) {
    setGuess(e.target.value);
  }

  return (
    <form>
      <input
        type="text"
        value={guess}
        onChange={handleChange}
        placeholder="enter your guess:"
      />
    </form>
  );
}

export default function Question({ country, nextQuestion }) {
  const [hint2, setHint2] = useState(false);
  const [hint3, setHint3] = useState(false);
  return (
    <div className="row">
      <div className="count-image-container col">
        <img src={country.image} className="count-image" />
      </div>
      <div className="count-hints-container col">
        <h2 className="guess-text">guess the country!</h2>
        <Guess />
        <HintButton
          hintNum={"hint #1"}
          hintTxt={country.hint1}
          clickable={true}
          setNext={setHint2}
        />
        <HintButton
          hintNum={"hint #2"}
          hintTxt={country.hint2}
          clickable={hint2}
          setNext={setHint3}
        />
        <HintButton
          hintNum={"hint #3"}
          hintTxt={country.hint3}
          clickable={hint3}
          setNext={""}
        />
      </div>
    </div>
  );
}
