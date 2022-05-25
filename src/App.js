import {BrowserRouter as Router,Routes,Route}  from 'react-router-dom';
import {DashBoard,Profile,SignUP,LogIn} from './pages';
import { useAuth } from './hooks/user-auth';
import userContext from './context/userContext';
function App() {
  const {user} = useAuth();
  return (
      <userContext.Provider value={{user}}>
        <Router>
          <Routes>
              <Route path='/' element={<DashBoard/>}></Route>
              <Route path='/login' element={<LogIn/>}></Route>
              <Route path='/signup' element={<SignUP/>}></Route>
              <Route path='/p/:username' element={<Profile/>}></Route>
              <Route path='/p/not-found' element={<div>not found</div>}></Route>
          </Routes>
        </Router>
      </userContext.Provider>
  );
}

export default App;