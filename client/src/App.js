import logo from './logo.svg';
import './App.css';
import {Switch, Link, Route} from 'react-router-dom'
import Main from './components/Main';
import Create from './components/Create';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path={'/add'}>
          <Create />
        </Route>

        <Route path={'/'}>
        <Main />
        </Route>

      </Switch>
    </div>
  );
}

export default App;
