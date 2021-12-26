import React from 'react';
// import React, { useState } from 'react';
import './App.css';

import { BrowserRouter, Routes ,Route } from 'react-router-dom';

// import FirstQuestion from './Components/first_question';
// import SecondQuestion from './Components/second_question';
// import ThirdQuestion from './Components/third_question';
// import Complete from './Components/complete';

import IdFilter from './Components/idFilter'

// import { useSelector } from 'react-redux';


const App = () => {
  // const [name, setName] = useState('')

  // const page = useSelector((state) => {
  //   return state.pageReducer.page
  // });

  // const onNameInputChange = (e) => {
  //   setName(e.target.value);
  //   // dispatch({type:'SET_NAME', name: e.target.value})
  //   // console.log(name)
  // }

  const ready = () => {
    alert("준비중입니다.")
  }

  return (
    <div className="App">
      <header className="App-header">
        <div className="pageRouter">
          <button className="active">아이디 중복 제거</button>
          <button onClick={ready}>백수 퀴즈</button>
        </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<IdFilter />} />
        </Routes>
      </BrowserRouter>
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
