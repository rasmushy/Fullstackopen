// @author Rasmus Hyyppä

import {useState} from "react";

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [voteArray, voteCounter] = useState(new Uint8Array(7));
  const [highestVoted, highestArray] = useState(0);

  const setVotes = () => {
    // copy our voteArray and save user vote to selected anecdote
    const votes = [...voteArray];
    votes[selected] += 1;
    voteCounter(votes);

    //if our selected anecdote is not voted higher than our highestvoted then return
    if (voteArray[selected] < voteArray[highestVoted]) {
      return;
    } else {
      highestArray(selected);
    }
  };

  // select next anecdote in list, after user input
  const handleSelected = () => {
    let nextIndex = selected + 1;
    setSelected(nextIndex);
  };

  // if selected at the end of anecdote list cycle it back to the first one.
  if (selected == anecdotes.length) {
    setSelected(0);
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <Button handleClick={() => setVotes()} text="vote" />
      <Button handleClick={() => handleSelected()} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[highestVoted]}</p>
    </div>
  );
};

export default App;
