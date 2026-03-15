import React, { useState } from "react";

function HintButton({
  hintNum,
  hintTxt,
  clickable,
  setNext,
  guessed,
  country,
  hintText,
  setHintText,
  score,
  setCurScore,
}) {
  return (
    <button
      className="hint-button"
      onClick={() => {
        setHintText(hintTxt);
        setCurScore(score);
        if (setNext) {
          setNext(true);
        }
      }}
      disabled={clickable || guessed ? false : true}
    >
      <span className="hint-text">
        {guessed ? hintTxt.replaceAll("???", country) : hintText}
      </span>
    </button>
  );
}

function Guess({
  setGuess,
  countryList,
  guessed,
  setGuessed,
  nextQuestion,
  answer,
  setCurScore,
  curScore,
  setTotalScore,
  totalScore,
}) {
  const [curGuess, setCurGuess] = useState("");
  const [filteredList, setFilteredList] = useState([]);

  function handleChange(e) {
    setCurGuess(e.target.value);

    const term = e.target.value;
    const results = countryList.filter((item) =>
      item.name.common
        .toLowerCase()
        .slice(0, term.length)
        .includes(term.toLowerCase()),
    );
    setFilteredList(results);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!guessed) {
      setGuess(e.target[0].value);
      setGuessed(true);
      if (answer.toLowerCase() !== e.target[0].value.toLowerCase()) {
        setCurScore(0);
        setTotalScore(totalScore);
      } else {
        setTotalScore(totalScore + curScore);
      }
    }
  }

  return (
    <div className="guess-container">
      <form onSubmit={handleSubmit}>
        <div className="input-area-container">
          <div className="input-area">
            <input
              type="text"
              value={curGuess}
              onChange={handleChange}
              placeholder="enter your guess:"
            />
            <div className="search-results">
              {filteredList.length && !guessed > 0 ? (
                <ul className="list-group">
                  {filteredList.map((item, index) => (
                    <li
                      className="list-group-item country-list-item"
                      key={index}
                      onClick={() => setCurGuess(item.name.common)}
                    >
                      {item.name.common}
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="list-group">
                  {!guessed && (
                    <li className="list-group-item">no results found</li>
                  )}
                </ul>
              )}
            </div>
          </div>
          <button type="submit" className="submit-btn" onClick={nextQuestion}>
            submit?
          </button>
        </div>
      </form>
    </div>
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

function NextQuestion({
  setGuessed,
  setCountry,
  nextQuestion,
  country,
  setHint2,
  setHint3,
  setHint1Text,
  setHint2Text,
  setHint3Text,
  setCurScore,
}) {
  return (
    <button
      className="control-btn"
      onClick={() => {
        setGuessed(false);
        setHint2(false);
        setHint3(false);
        setHint1Text("hint #1");
        setHint2Text("hint #2");
        setHint3Text("hint #3");
        setCurScore(100);
        setCountry(country);
      }}
    >
      next question
    </button>
  );
}

function EndQuiz({ setEnded }) {
  return <button onClick={() => setEnded(true)}>end quiz</button>;
}

function Score({ totalScore, curScore, guessed }) {
  return (
    <div className="score">
      <h3>score: {totalScore}</h3>
      <p className={guessed ? "cur-score active" : "cur-score"}>+{curScore}</p>
    </div>
  );
}

export default function QuestionMenu({
  country,
  nextQuestion,
  countryList,
  totalScore,
  setTotalScore,
  setEnded,
}) {
  const [curCountry, setCurCountry] = useState(country);
  const [curScore, setCurScore] = useState(100);

  const [hint2, setHint2] = useState(false);
  const [hint3, setHint3] = useState(false);

  const [hint1Text, setHint1Text] = useState("hint #1");
  const [hint2Text, setHint2Text] = useState("hint #2");
  const [hint3Text, setHint3Text] = useState("hint #3");

  const [guess, setGuess] = useState("");
  const [guessed, setGuessed] = useState(false);

  return (
    <div className="row">
      <Score totalScore={totalScore} curScore={curScore} guessed={guessed} />
      <div className="count-image-container col-sm">
        <img src={curCountry.image} className="count-image" />
      </div>
      <div className="count-hints-container col-sm">
        <h2 className="guess-text">guess the country!</h2>
        <Guess
          setGuess={setGuess}
          countryList={countryList}
          guessed={guessed}
          setGuessed={setGuessed}
          nextQuestion={nextQuestion}
          answer={curCountry.name}
          setCurScore={setCurScore}
          curScore={curScore}
          setTotalScore={setTotalScore}
          totalScore={totalScore}
        />
        {guessed && <Results guess={guess} answer={curCountry.name} />}
        <div className="hint-container">
          <HintButton
            hintNum={curCountry.hint1og}
            hintTxt={curCountry.hint1}
            clickable={true}
            setNext={setHint2}
            guessed={guessed}
            country={curCountry.name}
            hintText={hint1Text}
            setHintText={setHint1Text}
            score={95}
            setCurScore={setCurScore}
          />
          <HintButton
            hintNum={curCountry.hint2og}
            hintTxt={curCountry.hint2}
            clickable={hint2}
            setNext={setHint3}
            guessed={guessed}
            country={curCountry.name}
            hintText={hint2Text}
            setHintText={setHint2Text}
            score={90}
            setCurScore={setCurScore}
          />
          <HintButton
            hintNum={curCountry.hint3og}
            hintTxt={curCountry.hint3}
            clickable={hint3}
            setNext={""}
            guessed={guessed}
            country={curCountry.name}
            hintText={hint3Text}
            setHintText={setHint3Text}
            score={80}
            setCurScore={setCurScore}
          />
        </div>
        <NextQuestion
          setGuessed={setGuessed}
          setCountry={setCurCountry}
          nextQuestion={nextQuestion}
          country={country}
          setHint2={setHint2}
          setHint3={setHint3}
          setHint1Text={setHint1Text}
          setHint2Text={setHint2Text}
          setHint3Text={setHint3Text}
          setCurScore={setCurScore}
        />
        <EndQuiz setEnded={setEnded} />
      </div>
    </div>
  );
}
