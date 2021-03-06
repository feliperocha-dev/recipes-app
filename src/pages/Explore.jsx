import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import '../styles/pages/Explore.css';

function Explore() {
  return (
    <div>
      <Header />
      <BottomMenu />
      <div className="explore-container">
        <Link to="/explorar/comidas" id="food-link">
          <button data-testid="explore-food" type="button">Explorar Comidas</button>
        </Link>
        <Link to="/explorar/bebidas" id="drink-link">
          <button data-testid="explore-drinks" type="button">Explorar Bebidas</button>
        </Link>
      </div>
    </div>
  );
}

export default Explore;
