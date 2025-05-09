import { useState } from "react";



const Button = ({ color, onClick, nextPattern, isActive }) => {
    const [btnClick, setBtnClick] = useState(false);

    const animatePress = () => {
        setBtnClick(true);
        setTimeout(() => {
            setBtnClick(false);
        }, 100);
    }

    const hdlClick = () => {
        onClick()
        animatePress()
    }

    const colors = {
        0: 'bg-green-500 rounded-tl-full top-0 left-0',
        1: 'bg-red-500  rounded-tr-full top-0 right-0',
        2: 'bg-yellow-400  rounded-bl-full bottom-0 left-0',
        3: 'bg-blue-500  rounded-br-full bottom-0 right-0',
    };


    return (
        <button
            disabled={!isActive}
            onClick={() => { hdlClick() }}
            className={`btn ${!isActive ? '' : 'hover:opacity-80 cursor-pointer'} ${colors[color]} ${btnClick ? 'pressed' : ''} ${nextPattern === color ? 'pressed' : ''}`}>

        </button>

    )
}
export default Button