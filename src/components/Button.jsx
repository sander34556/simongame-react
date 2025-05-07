import { useState } from "react"

const colorClasses = {
    green: 'bg-green-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-500',
    blue: 'bg-blue-500',
};

const Button = ({ id, color, userChosenColour, nextPattern, checkAnswer }) => {
    const [btnClick, setBtnClick] = useState(false);

    const hdlClick = () => {
        userChosenColour(id);
        playSound(id);
        animatePress();

    }

    const animatePress = () => {
        setBtnClick(true);
        setTimeout(() => {
            setBtnClick(false);
        }, 100);
    }

    return (
        <button
            onClick={() => { hdlClick() }}
            className={`btn ${colorClasses[color]} ${btnClick ? 'pressed' : ''} ${nextPattern === id ? 'opacity-0' : 'opacity-100'} transition`}
        />

    )

    function playSound(id) {
        const audio = new Audio(`/sound/${id}.mp3`);
        audio.play().catch((e) => {
            console.error('Failed to play sound:', e);
        });
    }
}
export default Button