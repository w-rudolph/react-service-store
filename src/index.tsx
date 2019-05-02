import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, HashRouter, Redirect } from 'react-router-dom';
import AboutPage from './pages/About';
import HomePage from './pages/Home';

console.log(AboutPage)
const App: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="home" />
        </Route>
        <Route path="/about" component={AboutPage} />
        <Route path="/home" component={HomePage} />
      </Switch>
    </HashRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
