// @author rasmushy Rasmus Hyyppä
import {useState, useEffect} from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([]); //persons
  const [filterPersons, setFilterPersons] = useState(persons); //useState hook for filteredPersons, part of the Filter input - uses persons
  const [newName, setNewName] = useState(""); //useState hook for newNames, part of the form for Person
  const [newNumber, setNewNumber] = useState(""); //useState hook for newNumbers, part of the form for Person
  const [filter, setFilter] = useState(""); //useState hook for Filter input

  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      setPersons(response.data);
    });
  }, []);
  console.log("render", persons.length, "persons");

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} persons={persons} setFilterPersons={setFilterPersons} setFilter={setFilter} />
      <h3>Add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filterPersons={filterPersons} filter={filter} />
    </div>
  );
};

export default App;
