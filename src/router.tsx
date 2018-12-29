import * as React from 'react'

import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './home'

import PyEditor from './editor'

const Picture = () => <h2>Picture</h2>;
const Note = () => <h2>Note</h2>;
const Users = () => <h2>Users</h2>;

const AppRouter = () => (
  <Router>
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/pic/" component={Picture} />
      <Route path="/note/" component={PyEditor} />
      <Route path="/users/" component={Users} />
    </div>
  </Router>
);

export default AppRouter;