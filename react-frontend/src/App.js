
import { useState } from 'react';
import './App.css';
import HomePage from './stranice/HomePage';
import LoginPage from './stranice/LoginPage';

const App = ({initialToken}) => {

  const[token,setToken] = useState(initialToken);

  const addToken = (newToken) => {
    setToken(newToken);
    window.localStorage.setItem("auth_token",newToken);
  };

  const removeToken = () => {
    setToken(null);
    window.localStorage.removeItem("auth_token");
  };

  
  return <LoginPage />;
  
}

export default App;
