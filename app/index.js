import 'react';
import component from './src/components/component';
import './css/main.css';
import 'purecss';
import 'font-awesome/css/font-awesome.css';
import { bake } from './shake';
import './src/index';

bake();

document.body.appendChild(component());	