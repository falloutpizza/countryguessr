//everytime a function is called, return an object with country image, continent, pop. range, and flag desc loaded
function countryDetails(countries) {
  let random = Math.floor(Math.random() * 250 + 1);
  let randomCountry = countries[random];
  let cont;
  while (!randomCountry.population || randomCountry.cca2 === "PS") {
    random = Math.floor(Math.random() * 250 + 1);
    randomCountry = countries[random];
  }
  if (randomCountry.continents[1]) {
    cont = `${randomCountry.continents[0]} & ${randomCountry.continents[1]}`;
  } else {
    cont = randomCountry.continents[0];
  }
  //special case for lebanon
  if (randomCountry.name.common === "Lebanon") {
    randomCountry.flags.alt.replace("Lebanese Cedar", "cedar");
  }

  return {
    image: `/countries/${randomCountry.cca2.toLowerCase()}/vector.svg`,
    name: randomCountry.name.common,
    hint1: `This country is in ${cont}`,
    hint2: `The population of this country is ${randomCountry.population}`,
    hint3: randomCountry.flags.alt.replaceAll(randomCountry.name.common, "???"),
  };
}

export default countryDetails;
