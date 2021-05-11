import React from 'react';
import Main from './pages/Main'
import Shedule from './pages/Shedule'
import { Route, Switch } from "react-router-dom";


const App: React.FC = () => {
  return (
    <>
    <Switch>
      <Route path="/shedule" component={Shedule} />
      <Route path="/" exact component={Main} />
    </Switch>
    </>

  );
}

export default App;
