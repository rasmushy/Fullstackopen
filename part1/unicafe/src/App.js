// @author Rasmus Hyyppä

import {useState} from "react";

const Title = (props) => (
  <div>
    <h1>{props.title}</h1>
  </div>
);

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>;

const Statistics = (props) => {
  const totalValue = props.goodValue + props.neutralValue + props.badValue;
  const avgValue = (props.goodValue - props.badValue) / totalValue;
  const positiveValue = (props.goodValue / totalValue) * 100;
  if (totalValue > 0) {
    return (
      <div>
        <table>
          <tbody>
            <StatisticsLine text="good" value={props.goodValue} />
            <StatisticsLine text="neutral" value={props.neutralValue} />
            <StatisticsLine text="bad" value={props.badValue} />
            <StatisticsLine text="all" value={totalValue} />
            <StatisticsLine text="average" value={avgValue.toFixed(2)} />
            <StatisticsLine text="positive" value={positiveValue.toFixed(1) + " %"} />
          </tbody>
        </table>
      </div>
    );
  }
  //if there is no feedbacks given
  return <p>No Feedback given</p>;
};

const StatisticsLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
);

const App = () => {
  const feedbackText = "give feedback";
  const statisticsText = "statistics";
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <Title title={feedbackText} />
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Title title={statisticsText} />
      <Statistics goodValue={good} neutralValue={neutral} badValue={bad} />
    </div>
  );
};

export default App;
