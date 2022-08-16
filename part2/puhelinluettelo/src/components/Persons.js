import React from "react";

const Persons = (props) => {
  let x = ""; //empty string for mapping
  props.filter === "" ? (x = props.persons) : (x = props.filterPersons); //if filter input is empty show persons, else show filteredpersons

  //Mapping all the objects in the phonebook
  return (
    <div>
      {x.map((obj, i) => (
        <p key={i}>
          {obj.name} {obj.number}
        </p>
      ))}
    </div>
  );
};

export default Persons;
