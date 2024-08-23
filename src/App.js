
import './App.css';
import { BrowserRouter as Router, Routes, Route } from'react-router-dom';
import AdminLogin from './pages/admin';
import UserList from './pages/userList';
function App() {
  return (
   
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={
              <>
                <AdminLogin />
               
              </>
            } />
            <Route path="/userList" element={< UserList/>} />
            {/* <Route path="/secret-admin" element={<AdminLogin />} />
            <Route path="/userlist" element={<UserList />} /> */}

          </Routes>
        </div>
      </Router>
  
  );
}

export default App;
