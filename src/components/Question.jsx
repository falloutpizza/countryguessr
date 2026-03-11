import React, { useState } from "react";

function HintButton({
  hintNum,
  hintTxt,
  clickable,
  setNext,
  guessed,
  country,
}) {
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
      disabled={clickable || guessed ? false : true}
    >
      <span className="hint-text">
        {guessed ? hintTxt.replace("???", country) : hintText}
      </span>
    </button>
  );
}

function Guess({ setGuess }) {
  const [curGuess, setCurGuess] = useState("");

  function handleChange(e) {
    setCurGuess(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    setGuess(e.target[0].value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={curGuess}
        onChange={handleChange}
        placeholder="enter your guess:"
      />
    </form>
  );
}

function Results({ guess, answer }) {
  let message;
  if (guess.toLowerCase() == answer.toLowerCase()) {
    message = "congrats, you guessed correctly!!";
  } else {
    message = `unfortunately, you did not guess correctly :( the correct answer was: ${answer}`;
  }
  return <h3>{message}</h3>;
}

export default function Question({ country, nextQuestion }) {
  const [hint2, setHint2] = useState(false);
  const [hint3, setHint3] = useState(false);

  const [guess, setGuess] = useState("");

  return (
    <div className="row">
      <div className="count-image-container col">
        <img src={country.image} className="count-image" />
      </div>
      <div className="count-hints-container col">
        <h2 className="guess-text">guess the country!</h2>
        <Guess setGuess={setGuess} />
        {guess && <Results guess={guess} answer={country.name} />}
        <HintButton
          hintNum={"hint #1"}
          hintTxt={country.hint1}
          clickable={true}
          setNext={setHint2}
          guessed={guess}
          country={country.name}
        />
        <HintButton
          hintNum={"hint #2"}
          hintTxt={country.hint2}
          clickable={hint2}
          setNext={setHint3}
          guessed={guess}
          country={country.name}
        />
        <HintButton
          hintNum={"hint #3"}
          hintTxt={country.hint3}
          clickable={hint3}
          setNext={""}
          guessed={guess}
          country={country.name}
        />
      </div>
    </div>
  );
}
