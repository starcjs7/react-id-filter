import React from 'react';
// import React, { useState } from 'react';
import './App.css';

import { Routes ,Route, useNavigate } from 'react-router-dom';

// import FirstQuestion from './Components/first_question';
// import SecondQuestion from './Components/second_question';
// import ThirdQuestion from './Components/third_question';
// import Complete from './Components/complete';

import IdFilter from './Components/idFilter'
import Quiz from './Components/quiz'
import TwoHeart from './Components/twoHeart'

// import AngryBird from './Images/angry_bird.jpg'
// import HelltakerLucy from './Images/helltaker_lucy2.gif'
import HelltakerLucy from './Images/helltaker_vanripper.gif'
// import HelltakerLucy from './Images/kotori.png'

import { useSelector, useDispatch } from 'react-redux';


const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [name, setName] = useState('')

  const url = window.location.href;
  const path = url.substring(url.lastIndexOf('/'), url.length)

  const page = useSelector((state) => {
    return state.pageReducer.page
  });
  
  // const onNameInputChange = (e) => {
  //   setName(e.target.value);
  //   // dispatch({type:'SET_NAME', name: e.target.value})
  //   // console.log(name)
  // }

  const ready = () => {
    alert("준비중입니다.")
  }

  const onClickPage = (page) => {
    switch(page){
      case 'idFilter':
        navigate('/');
        dispatch({ type: 'pageReducer/SET_IDFILTER' });
        break;
      case 'quiz':
        navigate('/quiz');
        dispatch({ type: 'pageReducer/SET_QUIZ' });
        break;
      case 'twoHeart':
        navigate('/twoHeart');
        dispatch({ type: 'pageReducer/SET_TWOHEART' });
        break;
      default:
        navigate('/');
        dispatch({type:'pageReducer/SET_IDFILTER'});
        break;
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="pageRouter">
          <button className={path === '/' ? 'active' : ''} onClick={() => onClickPage('idFilter')}>아이디 중복 제거</button>
          <button className={path === '/quiz' ? 'active' : ''} onClick={() => onClickPage('quiz')}>백수 퀴즈</button>
          <button className={path === '/twoHeart' ? 'active' : ''} onClick={() => onClickPage('twoHeart')}>以心傳心</button>
          {/* <button className={path === '/twoHeart' ? 'active' : ''} onClick={() => ready()}>以心傳心</button> */}
          <label>※ 이동 시 데이터 삭제</label>
          
          <img src={HelltakerLucy} className="trademark" />
        </div>
        <Routes>
          <Route path='/' element={<IdFilter />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/twoHeart' element={<TwoHeart />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
