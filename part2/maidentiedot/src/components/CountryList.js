import React, {useState} from "react";


const Country = ({ name, capital, population, languages, flagUrl }) =>{
  return (
    <div>
      <h1>{name}</h1>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <h4>Languages: </h4>
       <ul>
       {Object.values(languages).map(language => (
         <li key={language}>{language}</li>
        ))}
     </ul>
     <br />
      <img src={flagUrl} alt="No flag found" height="200" width="300" />
    </div>
  );
};

const CountryWithButton = ({ name, country, showBut }) => {
  return (
    <li key={name}>
      <button value={country.name.common} onClick={showBut}>
        Show
      </button>
      &nbsp; {name}
    </li>
  );
};

const CountryFilter = ({countries, filter: filteredCountries, showCountryButton, showBut}) => {

  const entries = countries.filter(country => country.name.common.toLowerCase().includes(filteredCountries.toLowerCase()));

  if (entries.length >= 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (showCountryButton !== undefined) {
    return (
      <Country
        key={showCountryButton.name.common}
        name={showCountryButton.name.common}
        capital={showCountryButton.capital}
        population={showCountryButton.population}
        languages={showCountryButton.languages}
        flagUrl={showCountryButton.flags.svg}
      />
    );
  }

  if (entries.length > 1) {
    return (
      <ul>
        {countries
          .filter(country =>
            country.name.common.toLowerCase().includes(filteredCountries.toLowerCase())
          )
          .map(country => (
            <CountryWithButton
              key={country.name.common}
              name={country.name.common}
              country={country}
              showBut={showBut}
            />
          ))}
      </ul>
    );
  }


  return (
    <ul>
      {countries
       .filter(country =>
         country.name.common.toLowerCase().includes(filteredCountries.toLowerCase())
       )
       .map(country => (
         <Country
        key={country.name.common}
        name={country.name.common}
        capital={country.capital}
        population={country.population}
        languages={country.languages}
        flagUrl={country.flags.svg}
        />
       ))}
    </ul>
  );
};

export default CountryFilter;