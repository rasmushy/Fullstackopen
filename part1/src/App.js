const Header = (course) => {
  return (
    <div>
      <h1>{course.title}</h1>
    </div>
  );
};

const Content = (content) => {
  return (
    <div>
      <Part text={content.part1} total={content.total1} />
      <Part text={content.part2} total={content.total2} />
      <Part text={content.part3} total={content.total3} />
    </div>
  );
};

const Part = (part) => {
  return (
    <p>
      {part.text} {part.total}
    </p>
  );
};

const Total = (total) => {
  return (
    <div>
      <p>Number of exercises {total.amount}</p>
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header title={course} />
      <Content part1={part1} part2={part2} part3={part3} total1={exercises1} total2={exercises2} total3={exercises3} />
      <Total amount={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

export default App;
