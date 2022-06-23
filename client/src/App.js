import './App.css';
import React from 'react';
import {Route} from 'react-router-dom'
import Landing from './components/Landing/landing'
import Home from './components/Home/home'
import Detail from './components/Detail/detail';
import Create from './components/createDog/createDog';

function App() {
  return (
    <div className="App">
      <Route exact path = '/' component={Landing}/>
      <Route  path = '/home' component= {Home}/>
      <Route  path="/create" component={Create} />
      <Route  path = '/detail/:id' component={Detail}/>
    </div>
  );
}

export default App;
