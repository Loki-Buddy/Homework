import React from 'react';
import Nav from './Nav';
import { Link } from 'react-router-dom';
import './styles/Header.css';

function Header() {
  return (
    <header>
        <Link to="/"><h1>Hausaufgaben</h1></Link>
        <Nav />
    </header>
  )
}

export default Header