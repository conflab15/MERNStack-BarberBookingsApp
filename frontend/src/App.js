import React from 'react';
import './App.css';
import {Container} from 'react-bootstrap'

//Importing the Router for the application
import { BrowserRouter as Router, Route } from 'react-router-dom'

//Importing Components and Screens for the Web App...
import Header from './Components/Header'
import Footer from './Components/Footer'
import LandingScreen from './Screens/LandingScreen'
import HaircutsScreen from './Screens/HaircutsScreen'
import HaircutScreen from './Screens/HaircutScreen'
import ReviewScreen from './Screens/ReviewScreen'
import LoginScreen from './Screens/LoginScreen'
import RegisterScreen from './Screens/RegisterScreen'
import CustomerScreen from './Screens/CustomerScreen'
import BookingScreen from './Screens/BookingScreen'

function App() {
  return (
    <Router>
    <Header/>
      <Container>
        <Route path='/' component={LandingScreen} exact/>

        <Route path='/haircut' component={HaircutsScreen} exact/>
        <Route path='/haircuts/:id' component={HaircutScreen} />

        <Route path='/reviews' component={ReviewScreen} exact/>

        <Route path='/login' component={LoginScreen} exact/>
        <Route path='/register' component={RegisterScreen} exact/>

        <Route path='/account' component={CustomerScreen} exact/>

        <Route path='/makebooking' component={BookingScreen} exact/>

        
      </Container>
    <Footer/>
  </Router>
  );
}

export default App;
