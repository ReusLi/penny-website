import * as React from 'react'

import { Router, Route } from "react-router-dom";

import appHistory from 'store/route'

import { Row } from 'antd';

import NavBar from 'pages/navBar'

import Home from 'pages/home'
import Dirays from 'pages/diarys'
import Document from './doc'

import WriteDiary from 'pages/writeDiary'
import DiarySetting from 'components/diarySetting'


const topRow = {
  height: '100%',
}
const AppRouter = () => (
  <Router history={appHistory}>
    <Row style={topRow}>
      <NavBar />
      <Row style={{ height: '95%', background: 'rgba(255, 255, 255, 0.3)' }}>
        <Route path="/" exact component={Document} />
        {/* <Route path="/pic/" component={} /> */}
        <Route path="/dirays/" component={Dirays} />
        <Route path="/write-dirays/" component={WriteDiary} />
        <Route path="/doc/" component={Document} />
      </Row>
      <DiarySetting></DiarySetting>
    </Row>
  </Router>
);

export default AppRouter;