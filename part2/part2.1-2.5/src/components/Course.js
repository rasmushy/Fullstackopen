const Header = ({course}) => {
  return (
    <div>
      <h1>{course.name}</h1>
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
  const total = course.parts.reduce((sum, part) => {
    return sum + part.exercises;
  }, 0);

  return <p>total of {total} exercises</p>;
};

const Content = ({course}) => {
  const parts = course.parts;

  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercise={part.exercises} />
      ))}
    </div>
  );
};

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  );
};

export default Course;
