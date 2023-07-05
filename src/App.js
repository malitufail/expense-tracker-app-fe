import logo from './logo.svg';
import { useState } from "react";
import './App.css';
import Tracker from './components/Tracker';
import GlobalStyles from './globalStyles';
import styled from "styled-components";
import LoginUser from './components/Login';
import RegisterUser from './components/Register';

const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to bottom, #0F123B, #000);
  color:#fff;
`;

function App() {
  const [trackerToggle, setTrackerToggle] = useState(false);
  const [loginToggle, setLoginToggle] = useState(false);
  return (
    <div className="App">
        <Main> 
      <GlobalStyles />
      {trackerToggle && (
      <Tracker />
      )}

      {!trackerToggle && loginToggle && (
      <LoginUser setTrackerToggle={setTrackerToggle} setLoginToggle={setLoginToggle}/>
      )}

      {!trackerToggle && !loginToggle && (
      <RegisterUser setTrackerToggle={setTrackerToggle} setLoginToggle={setLoginToggle}/>
      )}
      
    </Main>
    </div>
  );
}

export default App;
