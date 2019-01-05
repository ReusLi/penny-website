import * as React from 'react'

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Row } from 'antd';

import NavBar from 'pages/navBar'

import Home from 'pages/home'
import DiaryDate from 'pages/diarys'
import DiaryList from 'pages/diaryList'

import PyEditor from 'components/editor'

const topRow = {
  height: '100%',
}
const AppRouter = () => (
  <Router>
    <Row style={topRow}>
      <NavBar />
      <Row style={{ height: '95%', background: 'rgba(255, 255, 255, 0.3)' }}>
        <Route path="/" exact component={Home} />
        <Route path="/pic/" component={DiaryDate} />
        <Route path="/note/" component={PyEditor} />
        <Route path="/user/" component={DiaryList} />
      </Row>
    </Row>
  </Router>
);

export default AppRouter;