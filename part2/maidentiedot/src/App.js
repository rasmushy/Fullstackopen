// @author rasmushy Rasmus Hyyppä
import {useState, useEffect} from "react";
import axios from "axios";

const CountryList = (props) => {
  let x = ""; //empty string for mapping
  props.filter === "" ? (x = props.countries) : (x = props.filteredCountry); //if filter input is empty show persons, else show filteredpersons

  //Mapping all the objects in the phonebook
  return (
    <div>
      {x.map((obj, i) => (
        <p key={i}>{obj.name.common}</p>
      ))}
    </div>
  );
};

function App() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState(""); //useState hook for Filter input
  const [filteredCountry, setFilteredCountry] = useState(countries);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      console.log(response.data);
      setCountries(response.data);
    });
  }, []);
  console.log("render", countries.length, "countries");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setFilteredCountry(countries.filter((country) => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())));
  };

  return (
    <div>
      filter shown with <input onChange={handleFilterChange} value={filter}></input>
      {filteredCountry.length > 10 ? (
        <p>Too many matches, specify another filter</p>
      ) : (
        <CountryList countries={countries} filteredCountry={filteredCountry} />
      )}
    </div>
  );
}

export default App;
