// @author Rasmus Hyyppä

const Header = ({course}) => {
  return (
    <div>
      <h1>{course.name}</h1>
    </div>
  );
};

const Content = ({course}) => {
  const parts = course["parts"];
  return (
    <div>
      <Part part={parts[0].name} exercise={parts[0].exercises} />
      <Part part={parts[1].name} exercise={parts[1].exercises} />
      <Part part={parts[2].name} exercise={parts[2].exercises} />
    </div>
  );
};

const Part = ({part, exercise}) => {
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

const Total = ({course}) => {
  let totalValue = course.parts[0].exercises + course.parts[1].exercises + course.parts[2].exercises;
  return (
    <div>
      <p>Number of exercises {totalValue}</p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default App;
