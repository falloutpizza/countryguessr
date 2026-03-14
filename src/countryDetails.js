//everytime a function is called, return an object with country image, continent, pop. range, and flag desc loaded
function countryDetails(countries) {
  let random = Math.floor(Math.random() * 250 + 1);
  let randomCountry = countries[random];

  return {
    image: `src/countries/${randomCountry.cca2.toLowerCase()}/vector.svg`,
    name: randomCountry.name.common,
    hint1: `This country is in ${randomCountry.region}`,
    hint2: `The population of this country is ${randomCountry.population}`,
    hint3: randomCountry.flags.alt.replaceAll(randomCountry.name.common, "???"),
  };
}

export default countryDetails;
