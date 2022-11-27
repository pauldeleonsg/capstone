import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Header from './components/Header/Header';
import HomePage from './pages/HomePage/HomePage';
import ProfilePage from './pages/ProfilePage/ProfilePage';

import './App.scss';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route path="/" exact component={HomePage}/>
          <Route path="/profile" component={ProfilePage}/>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;