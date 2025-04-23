import React from 'react';
import Nav from './Nav';
import { Link, useLocation } from 'react-router-dom';
import './styles/Header.css';

function Header() {
  return (
    <header>
        <Link to="/"><h1>Hausaufgaben</h1></Link>
        {
          WhereIam() ? (<h5>router-uebung OHNE API</h5>) : (<h5>router-uebung MIT API</h5>)
        }
        <Nav />
    </header>
  )
}

function WhereIam() {
  const here = useLocation();

  if(here.pathname === "/pokedex")
    return false;

  return true;
}

export default Header