import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const ThirdQuestion = (props) => {
    const dispatch = useDispatch();
    const name = props.name;
    const [menuInput, setMenuInput] = useState('')

    const onButtonSelected = () => {
        if (name === '')
            alert('제출 전 이름을 입력해주세요');
        else if (menuInput === '')
            alert('메뉴를 입력해주세요');
        else
            dispatch({type:'pageReducer/SET_COMPLETEPAGE'});
    }

    const onMenuInputChange = (e) => {
        setMenuInput(e.target.value);
    }

    return (
        <div className="containerDiv">
            <div className="rowDiv">
                <p>이거 먹고 싶어</p>
                <input type="text" className="optionMenuInput" onChange={onMenuInputChange} />
            </div>
            <div className="rowDiv">
                <button className="optionNextButton" onClick={onButtonSelected}>제출</button>
            </div>
        </div>
    );
}

export default ThirdQuestion;
