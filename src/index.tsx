import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AppRouter from './router'

import * as moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import './App.css';

ReactDOM.render(
  <AppRouter/>,
  document.getElementById('root') as HTMLElement
);
