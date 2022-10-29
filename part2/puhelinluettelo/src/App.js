// @author rasmushy Rasmus Hyyppä
import {useState, useEffect} from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personServices from "./services/personServices";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

//npm run server = json-server --port=3001 --watch db.json

const App = () => {
  const [persons, setPersons] = useState([]); //persons
  const [filterPersons, setFilterPersons] = useState(persons); //useState hook for filteredPersons, part of the Filter input - uses persons
  const [newName, setNewName] = useState(""); //useState hook for newNames, part of the form for Person
  const [newNumber, setNewNumber] = useState(""); //useState hook for newNumbers, part of the form for Person
  const [filter, setFilter] = useState(""); //useState hook for Filter input
  const [errorMessage, setErrorMessage] = useState('Some error happened...')
  const [cssStyle, setCssStyle] = useState("added");

  useEffect(() => {
    personServices.getAllPersons().then((initPersons) => {
      setPersons(initPersons);
    });
  }, []);
  //console.log("render", persons.length, "persons");

  const inputClear = (personObj) => {
    setPersons(persons.concat(personObj));
    setNewName("");
    setNewNumber("");
  };

  const clearErrorMsg = () => {
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  }

  const handleUpdatePerson = (findPerson, personObj) => {
    if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
      setCssStyle("success");
      personServices
        .updatePerson(findPerson.id, {...findPerson, number: newNumber})
        .then((updatedPerson) => {
          setPersons(persons.map((pName) => (pName.name === newName ? updatedPerson : pName)));
          setErrorMessage(`Changed ${personObj.name} number`);
          inputClear(personObj);
        })
        .catch((error) => {
          setErrorMessage("Updating failed.")
        })
        clearErrorMsg();
    }
  };

  const handleCreatePerson = (personObj) => {
    setCssStyle("success");
    personServices
      .createPerson(personObj)
      .then((newPerson) => {
        setErrorMessage(`Added ${newPerson.name}`);
        inputClear(newPerson);
      })
      .catch((error) => {
        setErrorMessage(`${error.response.data.error}`)
      });
      clearErrorMsg();
  };

  const handleDeletePerson = (name, id) => {
    return () => { //if no returning we are stuck deleting
      if (window.confirm(`Delete: ${name} ?`)) {
        setCssStyle("error");
        personServices
          .deletePerson(id)
          .then(() => {
            setPersons(persons.filter((p) => p.id !== id));
            setErrorMessage(`Deleted: ${name} .`);
          })
          .catch((error) => {
            setErrorMessage(`Person: ${name} , doesn't exist.`)        
          });
          clearErrorMsg();
      }
    };
  };


  return (
    <div>
      <Notification message={errorMessage} style={cssStyle}/>
      <h2>Phonebook</h2>
      <Filter value={filter} persons={persons} setFilterPersons={setFilterPersons} setFilter={setFilter} />
      <div>
        <h3>Add a new</h3>
        <PersonForm
          persons={persons}
          setPersons={setPersons}
          newName={newName}
          setNewName={setNewName}
          newNumber={newNumber}
          setNewNumber={setNewNumber}
          handleUpdatePerson={handleUpdatePerson}
          handleCreatePerson={handleCreatePerson}
        />
      </div>
      <h3>Numbers</h3>
      <div>
        <Persons persons={persons} filterPersons={filterPersons} filter={filter} handleDeletePerson={handleDeletePerson} />
      </div>
      <Footer />
    </div>
  );
};

export default App;
