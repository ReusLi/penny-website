import * as React from 'react';
import * as ReactDOM from 'react-dom';

import AppRouter from './router'

import './App.css';

ReactDOM.render(
  <AppRouter/>,
  document.getElementById('root') as HTMLElement
);
