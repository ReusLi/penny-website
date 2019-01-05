import * as React from 'react'

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Row } from 'antd';

import NavBar from 'pages/navBar'

import Home from 'pages/home'
import Dirays from 'pages/diarys'

import WriteDiary from 'pages/writeDiary'

const topRow = {
  height: '100%',
}
const AppRouter = () => (
  <Router>
    <Row style={topRow}>
      <NavBar />
      <Row style={{ height: '95%', background: 'rgba(255, 255, 255, 0.3)' }}>
        <Route path="/" exact component={Home} />
        {/* <Route path="/pic/" component={} /> */}
        <Route path="/dirays/" component={Dirays} />
        <Route path="/write-dirays/" component={WriteDiary} />
        {/* <Route path="/user/" component={} /> */}
      </Row>
    </Row>
  </Router>
);

export default AppRouter;