import React from 'react';
import './App.css';
import { Dashboard } from '../Dashboard/Dashboard';
import { DashboardService } from '../../core/dashboard.service';

const dashboard = new DashboardService();

function onWidgetClick(url: string): void {
  dashboard.onWidgetClick(url);
}

function App() {
  return (
    <Dashboard
      urlList={[
        'https://www.google.com/?client=safari',
        'https://www.youtube.com',
        'https://translate.google.com/?sl=en&tl=ru&op=translate',
        'https://developer.mozilla.org/en-US/docs/Web/CSS/margin',
        'https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-one-expression-per-line.md',
        'https://www.google.com/search?client=safari&rls=en&q=react+for+in&ie=UTF-8&oe=UTF-8',
        'https://styled-components.com/docs/basics',
        'https://etherscan.io/token/0x3d658390460295fb963f54dc0899cfb1c30776df#tokenAnalytics',
      ]}
      onWidgetClick={onWidgetClick}
    />
  );
}

export default App;
