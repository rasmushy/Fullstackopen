import Weather from "./Weather";

//Multiple countries shown with data
const CountryWithButton = ({name, country, showBut}) => {
  return (
    <li key={name}>
      <button value={country.name.common} onClick={showBut}>
        Show
      </button>
      &nbsp; {name}
    </li>
  );
};

//Single country with detailed data
const Country = ({name, capital, area, languages, flagUrl, lat, long}) => {
  return (
    <div>
      <h1>{name}</h1>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h4>Languages: </h4>
      <ul>
        {Object.values(languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <br />
      <img src={flagUrl} alt="No flag found" height="100" width="200" />
      <Weather lat={lat} long={long} />
    </div>
  );
};

const CountryFilter = ({countries, filter: filteredCountries, showCountryButton, showBut}) => {
  const countryData = countries.filter((country) => country.name.common.toLowerCase().includes(filteredCountries.toLowerCase()));

  if (countryData.length >= 10) return <p>Too many matches, specify another filter</p>;

  if (showCountryButton !== undefined) {
    return (
      <div>
        <Country
          key={showCountryButton.name.common}
          name={showCountryButton.name.common}
          capital={showCountryButton.capital}
          area={showCountryButton.area}
          languages={showCountryButton.languages}
          flagUrl={showCountryButton.flags.svg}
          lat={showCountryButton.latlng[0]}
          long={showCountryButton.latlng[1]}
        />
      </div>
    );
  }

  if (countryData.length > 1) {
    return (
      <div>
        {countryData.map((country) => (
          <CountryWithButton key={country.name.common} name={country.name.common} country={country} showBut={showBut} />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        {countryData.map((country) => (
          <Country
            key={country.name.common}
            name={country.name.common}
            capital={country.capital}
            area={country.area}
            languages={country.languages}
            flagUrl={country.flags.svg}
            lat={country.latlng[0]}
            long={country.latlng[1]}
          />
        ))}
      </div>
    );
  }
};
export default CountryFilter;
