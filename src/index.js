import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//how does the js know to get store.js from this; there is no store variable decalred in the store file (removed with export)
//bigger question: is the statement after import the name of the function?
import STORE from './STORE';
import App from './App';


ReactDOM.render(
    <App store={STORE} />, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
