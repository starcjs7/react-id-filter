import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const FirstQuestion = () => {
    const dispatch = useDispatch();
    const [radio, setRadio] = useState('')

    const onButtonSelected = () => {
        if (radio === 'eat')
            dispatch({ type: 'pageReducer/SET_SECONDPAGE' })
        else if (radio === 'noEat')
            dispatch({ type: 'pageReducer/SET_COMPLETEPAGE' })
        else
            alert('선택지를 선택해주세요')
    }

    const onRadioChange = (e) => {
        setRadio(e.target.value)
    }

    return (
        <div className="containerDiv">
            <div className="optionDiv">
                <label className="optionLabel" htmlFor="eat">먹는다</label>
                <input type="radio" className="optionRadio" name="eatCheck" id="eat" value="eat" onChange={onRadioChange} />
            </div>
            <div className="optionDiv">
                <label className="optionLabel" htmlFor="noEat">안먹는다</label>
                <input type="radio" className="optionRadio" name="eatCheck" id="noEat" value="noEat" onChange={onRadioChange} />
            </div>
            <div className="rowDiv">
                <button className="optionNextButton" onClick={onButtonSelected}>다음</button>
            </div>
        </div>
    );
}

export default FirstQuestion;
