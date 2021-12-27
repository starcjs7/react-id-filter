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

import { useSelector, useDispatch } from 'react-redux';


const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [name, setName] = useState('')

  const url = window.location.href;
  const path = url.substring(url.lastIndexOf('/'), url.length)

  console.log(path)
  const page = useSelector((state) => {
    return state.pageReducer.page
  });
  
  // const onNameInputChange = (e) => {
  //   setName(e.target.value);
  //   // dispatch({type:'SET_NAME', name: e.target.value})
  //   // console.log(name)
  // }

  // const ready = () => {
  //   alert("준비중입니다.")
  // }

  const onClickPage = (page) => {
    switch(page){
      case 'idFilter':
        navigate('/');
        dispatch({type:'pageReducer/SET_IDFILTER'});
        break;
      case 'quiz':
        navigate('/quiz');
        dispatch({type:'pageReducer/SET_QUIZ'});
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
          <label>※ 이동 시 데이터 삭제</label>
          {/* <button className={page === 'idFilter' ? 'active' : ''} onClick={() => onClickPage('idFilter')}>아이디 중복 제거</button>
          <button className={page === 'quiz' ? 'active' : ''} onClick={() => onClickPage('quiz')}>백수 퀴즈</button> */}
        </div>
        <Routes>
          <Route path='/' element={<IdFilter />} />
          <Route path='/quiz' element={<Quiz />} />
        </Routes>
        {/* <div className="rowDiv">
        {
          (() => {
            if(page !== 'complete')
              return <input type="text" className="optionNameInput" onChange={onNameInputChange} placeholder="이름" />
          })()
        }
        </div>
        {
          (() => {
            if(page === 'first') 
              return <FirstQuestion />
            else if(page === 'second') 
              return <SecondQuestion />
            else if(page === 'third') 
              return <ThirdQuestion name={name} />
            else if (page === 'complete')
              return <Complete />
          })()
        } */}
      </header>
    </div>
  );
}

export default App;
