import { useState } from "react";


export const useGameLogic = () => {
    const [sequence, setSequence] = useState([]);
    const [userInput, setUserInput] = useState([]);
    const [isActive, setIsActive] = useState(false);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(0);
    const [nextPattern, setNextPatterm] = useState(null);
    const [over, setOver] = useState(false);

    const startGame = () => {
        console.log('Game Start');
        setSequence([]);
        setUserInput([]);
        setIsActive(true);
        setScore(0);
        addNewColor();
        setLevel(1);
        setOver(false);
    };

    const addNewColor = () => {
        const newColor = Math.floor(Math.random() * 4);
        setSequence(prev => [...prev, newColor]);
        playSound(newColor);
        setNextPatterm(newColor);
        setTimeout(() => {
            setNextPatterm(null);
        }, 100);
    };

    const handleButtonClick = (color) => {

        const newUserInput = [...userInput, color];
        setUserInput(newUserInput);

        if (sequence[newUserInput.length - 1] === color) {
            if (newUserInput.length === sequence.length) {
                setTimeout(function () {
                    handleCorrectSequence();
                }, 1000);
            }
        } else {
            handleWrongInput();
            return;
        }
        playSound(color);
    }

    const handleCorrectSequence = () => {
        const newScore = score + 1;
        setScore(newScore);

        setLevel(lv => lv + 1);
        setUserInput([]);

        addNewColor();
    }

    const handleWrongInput = () => {
        console.log("Game Over");
        playSound(4);
        setOver(true);
        setIsActive(false);
    }

    const playSound = (color) => {
        const colors = {
            0: 'green',
            1: 'red',
            2: 'yellow',
            3: 'blue',
            4: 'wrong'
        }
        const audio = new Audio(`/sound/${colors[color]}.mp3`);
        audio.play();
    }


    return {
        sequence,
        nextPattern,
        isActive,
        score,
        level,
        over,
        startGame,
        handleButtonClick
    };
}