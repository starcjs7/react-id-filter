import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

const SecondQuestion = () => {
    const dispatch = useDispatch();
    const [radio, setRadio] = useState('')

    const onButtonSelected = () => {
        if (radio === 'comment')
            dispatch({type:'pageReducer/SET_THIRDPAGE'})
        else if (radio === 'noComment')
            dispatch({type:'pageReducer/SET_COMPLETEPAGE'})
        else
            alert('선택지를 선택해주세요')
    }

    const onRadioChange = (e) => {
        setRadio(e.target.value)
    }

    return (
        <div className="containerDiv">
            <div className="optionDiv">
                <label className="optionLabel" htmlFor="comment">메뉴 의견 있음</label>
                <input type="radio" className="optionRadio" name="commentCheck" id="comment" value="comment" onChange={onRadioChange} />
            </div>
            <div className="optionDiv">
                <label className="optionLabel" htmlFor="comment">메뉴 의견 없음</label>
                <input type="radio" className="optionRadio" name="commentCheck" id="comment" value="noComment" onChange={onRadioChange} />
            </div>
            <div className="rowDiv">
                <button className="optionNextButton" onClick={onButtonSelected}>다음</button>
            </div>
        </div>
    );
}

export default SecondQuestion;
