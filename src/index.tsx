import * as React from 'react';
import * as ReactDOM from 'react-dom';

import * as MobX from 'mobx';

import AppRouter from './router'

import * as moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

import './App.css';

// 严格模式
MobX.configure({
	enforceActions: 'always'
});


ReactDOM.render(
  <AppRouter/>,
  document.getElementById('root') as HTMLElement
);
