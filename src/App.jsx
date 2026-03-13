import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "./App.css";

//importing components
import StartMenu from "./components/StartMenu";
import Question from "./components/QuestionMenu";

//importing functions
import countryDetails from "./countryDetails";

function App() {
  const [started, setStarted] = useState(false);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);

  //fetches country data on load
  useEffect(() => {
    async function fetchCountries() {
      const response = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,population,flags,region,subregion,cca2",
      );
      setCountries(response.data);
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
      {started && country && (
        <Question
          country={country}
          nextQuestion={loadRandomCountry}
          countryList={countries}
        />
      )}
    </div>
  );
}

export default App;
