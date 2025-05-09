import { useState } from "react";
import Button from "./components/game/Button";
import { useGameLogic } from "./hooks/useGameLogic"



const App = () => {
  const {  sequence, handleButtonClick, startGame, level, nextPattern, over, isActive } = useGameLogic();

  // console.log({ level, sequence, userInput });
  console.log(sequence);
  return (
    <div className={`flex flex-col gap-20 items-center justify-center h-screen ${over ? 'bg-rose-800' : 'bg-neutral-800'}`}>
      {
        over ? <h1 className="title" onClick={() => { startGame() }}>GAME OVER</h1>
          : level === 0
            ? <h1 className="title" onClick={() => { startGame() }}>Start Game</h1>
            : <h1 className="title">Level {level}</h1>
      }

      <div className="relative w-[400px] h-[400px] rounded-full ">
        {[0, 1, 2, 3].map((color) =>
          <Button
            key={color}
            color={color}
            nextPattern={nextPattern}
            isActive={isActive}
            onClick={() => { handleButtonClick(color) }}
          />
        )}
        <div className="absolute w-32 h-32 bg-black rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div >
  )
}
export default App