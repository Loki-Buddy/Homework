import React from 'react'
import { Link } from 'react-router-dom';
import './styles/Nav.css';

function Nav() {
    return (
        <div>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/faq">FAQ</Link>
            <Link to="/impressum">Impressum</Link>
            <Link to="/pokedex">Pokemon</Link>
        </div>
    )
}

export default Nav