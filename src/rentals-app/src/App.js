import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import LandingPageComponent from './components/LandingPageComponent';
import HeaderComponent from './components/HeaderComponent';

function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Switch>
        <Route exact path="/" component={LandingPageComponent} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;