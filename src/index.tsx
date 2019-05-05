import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, HashRouter } from 'react-router-dom';
import TodoPage from './pages/Todo';
import TodoDetailPage from './pages/TodoDetail';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Switch>
        <Route path="/" exact component={TodoPage} />
        <Route path="/todo-add" component={TodoDetailPage} />
        <Route path="/todo-detail/:id" component={TodoDetailPage} />
      </Switch>
    </HashRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
