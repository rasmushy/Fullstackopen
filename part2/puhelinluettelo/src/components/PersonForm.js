import React from "react";

const PersonForm = (props) => {

  const handleNameChange = (event) => {
    props.setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    props.setNewNumber(event.target.value);
  };

    /*  Im here to handle name&number changes before submit  */
  const handlePersonForm = (event) => {
    event.preventDefault();
    const personArr = props.persons.map((obj) => obj.name);
    const personObj = {
      name: props.newName,
      number: props.newNumber,
      id: 1+personArr.lenght
    };

    //Check if same named person is already in our phonebook
    if (personArr.includes(`${personObj.name}`)) {
        const findPerson = personArr.find((pName) => pName === props.newName);
        props.handleUpdatePerson(findPerson, personObj);
    } else {
      /*Adding new person to the phonebook*/
      props.handleCreatePerson(personObj);
    }
  }

  return (
      <form onSubmit={handlePersonForm}>
        <label htmlFor="name">Name:</label><br />
        <input value={props.newName} onChange={handleNameChange} /> <br/>
        <label htmlFor="number">Number:</label><br/>
        <input value={props.newNumber} onChange={handleNumberChange} /><br /><br />
        <button type="submit">Add person</button>
      </form>
  )

}

export default PersonForm;
