import React from "react"

const Persons = (props) => {
  let listedPersons = "" //empty string for mapping
  props.filter ? (listedPersons = props.filterPersons) : (listedPersons = props.persons)
  //if filter input is empty show persons, else show filteredpersons
  //Mapping all the objects in the phonebook
  return (
    <ol>
      {listedPersons.map((obj) => (
        <li className="person" key={obj.id}>
          {obj.name} {obj.number}
          <button
            onClick={() => {
              props.handleDeletePerson(obj.name, obj.id)
            }}>
            Delete
          </button>
        </li>
      ))}
    </ol>
  )
}

export default Persons
