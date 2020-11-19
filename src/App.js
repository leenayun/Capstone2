import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';
import axios from 'axios';

import Routes from './Routes';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
    };
  }

  // componentDidMount() {
  //   fetch('http://localhost:3001/api')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       this.setState({ username: data.username });
  //       console.log('username:::', data.username);
  //     });
  //   this._getHello();
  // }
  // _getHello = async () => {
  //   const res = await axios.get('/apartment');
  //   console.log('dbdbdbdb::::::', res);
  // };

  render() {
    const { username } = this.state;

    return <Routes />;
  }
}

export default App;
/* 
import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';

import Routes from './Routes';

const App = () => {

  
  componentDidMount(){
    fetch('http://localhost:3001/api')
      .then(res => res.json())
      .then(data => this.setState({title: data.title}));
  }


  return <Routes />;
};

export default App;
*/
