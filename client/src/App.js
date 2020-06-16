import React from 'react';
import './App.css';
import { ApolloProvider } from '@apollo/react-hooks';
import logo from './logo.png'
import Launches from './components/Launches';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ApolloClient from 'apollo-boost';
import Launch from './components/Launch';

const client = new ApolloClient({
  uri: 'https://apollo-graphql-react-server.herokuapp.com/graphql',
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <div className="container">
        <img src={logo} alt="" style={{width:300,margin:"auto",display:"block"}}/>
        <Route exact path="/" component={Launches}/>
        <Route exact path="/launch/:flight_number" component={Launch}/>
      </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
