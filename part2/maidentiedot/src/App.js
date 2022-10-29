// @author rasmushy Rasmus Hyyppä
import {useState, useEffect} from "react";
import axios from "axios";
import CountryList from "./components/CountryList";

function App() {
  const [countries, setCountries] = useState([]);
  const [filterCountry, setFilterCountry] = useState(""); //useState hook for Filter input
  const [showCountryButton, setShowCountryButton] = useState();

  const showBut = (event) => {
    const country = countries.filter(country => country.name.common.includes(event.target.value));
    setShowCountryButton(country[0]);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      console.log(response.data);
      setCountries(response.data);
    });
  }, []);
  console.log("render", countries.length, "countries");

  const handleFilterChange = (event) => {
    setFilterCountry(event.target.value);
    setShowCountryButton(undefined);
  };

  return (
    <div>
      <form>
      Find countries: <input onChange={handleFilterChange} value={filterCountry}></input>
      </form>
      <CountryList countries={countries} filter={filterCountry} showCountryButton={showCountryButton} showBut={showBut} />
    </div>
  );
}

export default App;
