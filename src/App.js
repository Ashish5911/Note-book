import './App.css';
import {Route ,BrowserRouter, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
// import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  
  return (
    <>
      <NoteState>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navbar />}  >
          
            {/* <Alert message="This is amazing React course" /> */}
            
            
            <Route index element={<Home />} />
            <Route exact path="About" element={<About/>} />
            <Route exact path="Login"  element={<Login/>} />
            <Route exact path="Signup"  element={<Signup/>} />
            
          </Route>
          
        </Routes>
      </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;