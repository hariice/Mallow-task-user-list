import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListUsers from './component/list-user';
import Login from './component/login';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/user-list' element={<ListUsers />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
