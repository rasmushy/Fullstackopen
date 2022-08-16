import React from "react";

const Filter = (props) => {
  const handleFilterChange = (event) => {
    props.setFilter(event.target.value);
    //Filtering person case insensitive with lowercase trick
    props.setFilterPersons(props.persons.filter((person) => person.name.toLowerCase().includes(event.target.value.toLowerCase())));
  };

  return (
    <div>
      filter shown with <input onChange={handleFilterChange} value={props.value}></input>
    </div>
  );
};

export default Filter;
