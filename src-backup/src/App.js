import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'; 
import Navbar from './components/layout/Navbar';
import Search from './components/pages/Search'
import Dashboard from './components/pages/Dashboard';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Logout from './components/auth/Logout';


const App = () => {
  return (
    <div className='App'>

      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Search />
            <Dashboard />
          </Route>
          <Route path='/login' component={Login} exact />
          <Route path='/signup' component={Signup} exact />

          <Route path='/logout' component={Logout} exact />
        </Switch>


      </Router>

    </div>
  );
};

export default App;


