import * as React from 'react'

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Row } from 'antd';

import Home from 'pages/home'
import DiaryDate from 'pages/diaryDate'

import PyEditor from 'components/editor'

const Users = () => <h2>Users</h2>;

const AppRouter = () => (
  <Router>
    <Row style={{height: '100%'}}>
      <Route path="/" exact component={Home} />
      <Route path="/pic/" component={DiaryDate} />
      <Route path="/note/" component={PyEditor} />
      <Route path="/users/" component={Users} />
    </Row>
  </Router>
);

export default AppRouter;