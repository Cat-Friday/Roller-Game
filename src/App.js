import Die from "./Die";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

/**
 * Challenge: Tie off loose ends!
 * 1. If tenzies is true, Change the button text to "New Game"
 * 2. If tenzies is true, use the "react-confetti" package to
 *    render the <Confetti /> component 🎉
 *
 *    Hint: don't worry about the `height` and `width` props
 *    it mentions in the documentation.
 */

function App() {
  const allNewDice = () => {
    let newDice = [];
    for (let i = 0; i < 10; i++) {
      let randomNumber = Math.floor(Math.random() * 6) + 1;

      newDice.push({ id: nanoid(), value: randomNumber, isHeld: false });
    }
    //console.log(newDice);
    return newDice;
  };

  const [numArr, setNumArr] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [fail, setFail] = useState(false);
  const [attempt, setAttempt] = useState(15);
  //console.log(numArr);

  const handleClick = () => {
    if (tenzies) {
      setNumArr(allNewDice());
      setTenzies((prev) => !prev);
      setAttempt(15);
    } else if (fail) {
      setNumArr(allNewDice());
      setFail(false);
      setAttempt(15);
    } else {
      let newDice = allNewDice();
      setNumArr((prev) =>
        prev.map((elem) => {
          return elem.isHeld
            ? elem
            : {
                ...elem,
                value: newDice[Math.floor(Math.random() * 9)].value,
              };
        })
      );
      setAttempt((prev) => prev - 1);
    }
  };

  const holdDice = (id) => {
    setNumArr((prev) =>
      prev.map((elem) => {
        return elem.id === id ? { ...elem, isHeld: !elem.isHeld } : elem;
      })
    );
  };

  useEffect(
    function () {
      let allHeld = numArr.filter((elem) => elem.isHeld === false);
      let num = numArr.map((elem) => elem.value);
      let allNum = num.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );

      if (allNum / 10 === numArr[0].value && allHeld.length === 0) {
        setTenzies(true);
      }
      if (
        (allNum / 10 !== numArr[0].value && allHeld.length === 0) ||
        attempt === 0
      ) {
        setFail(true);
      }
    },
    [numArr, attempt]
  );

  return (
    <div className="main">
      {tenzies && <Confetti height={window.innerHeight} />}
      <h1>Tenzies</h1>
      {tenzies && <h2 className="won">You Won</h2>}
      {fail && <h2 className="won">You Loose</h2>}
      <p>
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls. You have <span>{attempt}</span> attemps to
        roll
      </p>
      <div className="die-container">
        {numArr.map((elem) => {
          return (
            <Die
              value={elem.value}
              key={elem.id}
              isHeld={elem.isHeld}
              holdDice={holdDice}
              id={elem.id}
            ></Die>
          );
        })}
      </div>
      <button type="button" onClick={handleClick}>
        {tenzies || fail ? "Restart Game" : "Roll"}
      </button>
    </div>
  );
}

export default App;
