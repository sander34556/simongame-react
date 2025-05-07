import { useState } from "react";
import Button from "./components/Button"

const buttonColors = ["red", "blue", "green", "yellow"];

const App = () => {
  const [gamePattern, setGamePatten] = useState([]);
  const [userClickedPattern, setUserClickedPattern] = useState([]);
  const [nextPattern, setNextPattern] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);

  const [level, setLevel] = useState(0);


  return (
    <div className={`h-screen w-full flex flex-col items-center transition-all duration-300 ${isGameOver ? 'bg-rose-700' : 'bg-zinc-700'}`}>
      <h1
        onClick={() => {
          if (level === 0 || isGameOver) {
            setIsGameOver(false);
            nextSequence();
          }
        }}
        className="title text-center my-10 cursor-pointer"
      >
        {isGameOver ? "Game Over - Click to Restart" : level === 0 ? "Press to Start" : `Level ${level}`}
      </h1>


      <div className="mt-10 mx-auto">
        <div>
          <Button id={'green'} color={'green'} userChosenColour={userChosenColour} nextPattern={nextPattern} checkAnswer={checkAnswer} />
          <Button id={'red'} color={'red'} userChosenColour={userChosenColour} nextPattern={nextPattern} checkAnswer={checkAnswer} />
        </div>
        <div>
          <Button id={'yellow'} color={'yellow'} userChosenColour={userChosenColour} nextPattern={nextPattern} checkAnswer={checkAnswer} />
          <Button id={'blue'} color={'blue'} userChosenColour={userChosenColour} nextPattern={nextPattern} checkAnswer={checkAnswer} />
        </div>
      </div>

    </div>
  )

  function userChosenColour(id) {
    const newPattern = [...userClickedPattern, id];
    setUserClickedPattern(newPattern);
    checkAnswer(newPattern, newPattern.length - 1);
  }

  function nextSequence() {
    setUserClickedPattern([]);
    setLevel((lv) => lv + 1);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColors[randomNumber];
    setGamePatten([...gamePattern, randomChosenColour]);

    setNextPattern(randomChosenColour);
    setTimeout(() => {
      setNextPattern(null);
    }, 100);

    //play sound randomChosenColour
    playSound(randomChosenColour);

  }

  function playSound(id) {
    const audio = new Audio(`/sound/${id}.mp3`);
    audio.play().catch((e) => {
      console.error('Failed to play sound:', e);
    });
  }

  function checkAnswer(pattern, currentLevel) {
    if (pattern[currentLevel] === gamePattern[currentLevel]) {
      if (pattern.length === gamePattern.length) {
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      console.log("game-over");
      setIsGameOver(true);
      startOver();
    }
  }

  function startOver() {
    setLevel(0);
    setGamePatten([]);
    setUserClickedPattern([]);
  }

}
export default App