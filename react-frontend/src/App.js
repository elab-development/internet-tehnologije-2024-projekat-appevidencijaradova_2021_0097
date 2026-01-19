
import { useState } from 'react';
import './App.css';
import HomePage from './stranice/HomePage';
import LoginPage from './stranice/LoginPage';
import RegisterPage from './stranice/RegisterPage';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import KontaktPage from './stranice/KontaktPage';
import UsersPage from './stranice/UsersPage';
import DocumentsPage from './stranice/DocumentsPage';
import SlanjeFajlova from './stranice/SlanjeFajlova';
import NavBar from './komponente/NavBar';

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

  
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar token = {token} removeToken={removeToken} />
        <Routes>
          <Route path = '/' element={<HomePage/>}/>
          <Route path = '/login' element={<LoginPage addToken={addToken}/>}/>
          <Route path = '/register' element={<RegisterPage />}/>
          <Route path = '/contact' element={<KontaktPage />}/>
          <Route path = '/users' element={<UsersPage authToken={token}/>}/>
          <Route path = '/documents' element={<DocumentsPage authToken={token}/>}/>
          <Route path = '/upload' element={<SlanjeFajlova authToken={token}/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
