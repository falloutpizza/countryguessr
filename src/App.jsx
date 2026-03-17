import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

//importing components
import StartMenu from "./components/StartMenu";
import QuestionMenu from "./components/QuestionMenu";
import EndMenu from "./components/EndMenu";

//importing functions
import countryDetails from "./countryDetails";

function App() {
  const [started, setStarted] = useState(false);
  const [ended, setEnded] = useState(false);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [totalScore, setTotalScore] = useState(0);

  //fetches country data on load
  useEffect(() => {
    async function fetchCountries() {
      let response = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,population,flags,continents,cca2,status,independent",
      );
      let filteredCountries = response.data.filter(
        (item) => item.status === "officially-assigned" && item.independent,
      );
      setCountries(filteredCountries);
    }
    fetchCountries();
  }, []);

  function loadRandomCountry() {
    const data = countryDetails(countries);
    setCountry(data);
  }

  useEffect(() => {
    if (started && countries.length > 0) {
      loadRandomCountry();
    }
  }, [started, countries]);

  return (
    <div className="main-container container-fluid">
      {!started && <StartMenu started={started} setStarted={setStarted} />}
      {started && country && !ended && (
        <QuestionMenu
          country={country}
          nextQuestion={loadRandomCountry}
          countryList={countries}
          totalScore={totalScore}
          setTotalScore={setTotalScore}
          setEnded={setEnded}
        />
      )}
      {ended && (
        <EndMenu
          score={totalScore}
          setStarted={setStarted}
          setEnded={setEnded}
          setTotalScore={setTotalScore}
        />
      )}
    </div>
  );
}

export default App;
