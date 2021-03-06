import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchRandomDrink } from '../services/CocktailApi';
import { fetchRandomMeal } from '../services/MealApi';

function Buttons({ origin }) {
  const [idDrink, setIdDrink] = useState('');
  const [idMeal, setIdMeal] = useState('');

  function getRandomDrink() {
    fetchRandomDrink().then((response) => {
      setIdDrink(response.idDrink);
    });
  }

  function getRandomMeal() {
    fetchRandomMeal().then((response) => {
      setIdMeal(response.idMeal);
    });
  }

  useEffect(() => {
    getRandomDrink();
    getRandomMeal();
  }, []);

  if (origin) {
    return (
      <>
        <Link to="/explorar/comidas/ingredientes">
          <button
            data-testid="explore-by-ingredient"
            type="button"
          >
            Por Ingredientes
          </button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button
            data-testid="explore-by-area"
            type="button"
          >
            Por Local de Origem
          </button>
        </Link>
        <Link to={ `/comidas/${idMeal}` }>
          <button
            data-testid="explore-surprise"
            type="button"
          >
            Me Surpreenda!
          </button>
        </Link>
      </>
    );
  }
  return (
    <>
      <Link to="/explorar/bebidas/ingredientes">
        <button
          id="ingredient-drinks-link"
          data-testid="explore-by-ingredient"
          type="button"
        >
          Por Ingredientes
        </button>
      </Link>
      <Link to={ `/bebidas/${idDrink}` }>
        <button
          id="surprise-drinks-link"
          data-testid="explore-surprise"
          type="button"
        >
          Me Surpreenda!
        </button>
      </Link>
    </>
  );
}

Buttons.propTypes = {
  origin: PropTypes.bool,
}.isRequired;

export default Buttons;
