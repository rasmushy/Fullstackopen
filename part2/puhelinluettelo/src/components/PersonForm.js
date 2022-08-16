import React from "react";

const PersonForm = (props) => {
  /*
Adding new person to the phonebook
*/
  const handleNewPerson = (event) => {
    event.preventDefault();

    const personArr = props.persons.map((obj) => obj.name);
    const personObj = {
      name: props.newName,
      number: props.newNumber,
    };

    //Check if same named person is already in our phonebook
    if (personArr.includes(`${personObj.name}`)) {
      alert(`${props.newName} is already added to the phonebook`);
    } else {
      props.setPersons(props.persons.concat(personObj));
      props.setNewName("");
      props.setNewNumber("");
    }
  };
  /*
  Im here to handle name&number changes before submit
  */
  const handleNameChange = (event) => {
    props.setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    props.setNewNumber(event.target.value);
  };

  return (
    <form onSubmit={handleNewPerson}>
      <div>
        name: <input value={props.newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={props.newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
