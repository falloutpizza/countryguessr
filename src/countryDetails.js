//everytime a function is called, return an object with country image, continent, pop. range, and flag desc loaded
import axios from "axios";

let countries;
async function countryRetrieval() {
  countries = await axios.get(
    "https://restcountries.com/v3.1/all?fields=name,population,flags,region,subregion,cca2",
  );
  return countries;
}

function countryDetails() {
  countryRetrieval().then((countries) => {
    let random = Math.floor(Math.random() * 249 + 1);
    let randomCountry = countries.data[random];

    let hint1 = `This country is in ${randomCountry.region}`;
    let hint2 = `The population of this country is ${randomCountry.population}`;
    let hint3 = randomCountry.flags.alt.replaceAll(
      randomCountry.name.common,
      "???",
    );
    console.log(randomCountry.name.common);
    console.log({
      image: `./countries/${randomCountry.cca2}/512.png`,
      name: randomCountry.name,
      hint1: hint1,
      hint2: hint2,
      hint3: hint3,
    });
  });
}

export default countryDetails;
