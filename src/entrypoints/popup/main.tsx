import { render } from 'solid-js/web';

import { configureKaijuSiteScopeLogging } from '@/lib/diagnostics/logging';

import './style.css';
import App from './App';

configureKaijuSiteScopeLogging('popup');

render(() => <App />, document.getElementById('root')!);
