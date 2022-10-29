import React from "react";

const Persons = (props) => {
  let listedPersons = ""; //empty string for mapping
  props.filter === "" ? (listedPersons = props.persons) : (listedPersons = props.filterPersons); 
  //if filter input is empty show persons, else show filteredpersons

  //Mapping all the objects in the phonebook
  return (
    <ol>
      {listedPersons.map((obj, i) => (
        <li className="person" key={i}>
          <label>{obj.name} {obj.number}</label>
          <button onClick={props.handleDeletePerson(obj.name, obj.id)}>Delete</button>
        </li>
      ))}
    </ol>
  )
}

export default Persons;
