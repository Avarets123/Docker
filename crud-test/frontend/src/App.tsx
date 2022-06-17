import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Header } from './components/Header/Header';
import Login from './components/Login/Login';
import MainContent from './components/MainContent/MainContent';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';


function App(): JSX.Element {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<MainContent />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
