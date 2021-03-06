import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import '../styles/pages/FavoriteRecipes.css';

const copy = require('clipboard-copy');

function FavoriteRecipes() {
  const [filter, setFilter] = useState('');
  const favorites = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const [copied, setCopy] = useState(false);

  const handleFilter = ({ target }) => {
    const { value } = target;
    setFilter(value);
  };

  const filterMeal = () => {
    if (favorites !== null) {
      return favorites.filter((meal) => {
        switch (filter) {
        case 'All':
          return favorites;
        case 'Food':
          return meal.type === 'comida';
        case 'Drinks':
          return meal.type === 'bebida';
        default:
          return favorites;
        }
      });
    }
    return [];
  };

  function shareButtonClick(meal) {
    setCopy({ ...copied, [meal.id]: true });
    copy(`http://localhost:3000/${meal.type}s/${meal.id}`);
  }

  function removeFavorite(meal) {
    const newFavorites = favorites
      .filter((food) => food.id !== meal.id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
    document.location.reload();
  }

  const mealByFilter = filter ? filterMeal() : favorites;

  return (
    <div>
      <Header />
      <div className="favorite-recipes-buttons-container">
        <button
          data-testid="filter-by-all-btn"
          value="All"
          type="button"
          onClick={ handleFilter }
          className="filter-btn"
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          value="Food"
          type="button"
          onClick={ handleFilter }
          className="filter-btn"
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          value="Drinks"
          type="button"
          onClick={ handleFilter }
          className="filter-btn"
        >
          Drinks
        </button>
      </div>
      { (mealByFilter !== null) && mealByFilter.map((meal, index) => (
        meal.type === 'comida' ? (
          <div className="favorite-card" key={ `${index}-recipe-card` }>
            <Link to={ `/comidas/${meal.id}` }>
              <div
                className="favorite-recipe-card"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ meal.image }
                  data-testid={ `${index}-horizontal-image` }
                  alt={ meal.name }
                />
              </div>
            </Link>
            <div>
              <div className="recipe-name">
                <Link to={ `/comidas/${meal.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{ meal.name }</p>
                </Link>
                <span data-testid={ `${index}-horizontal-top-text` }>
                  { `${meal.area} - ${meal.category}` }
                </span>
              </div>
              <div className="favorite-card-buttons">
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  src={ shareIcon }
                  onClick={ () => shareButtonClick(meal) }
                  className="share-btn"
                >
                  { (copied[meal.id]) ? <p>Link copiado!</p> : (
                    <img src={ shareIcon } alt="Compartilhar" />
                  ) }
                </button>
                <button
                  type="button"
                  onClick={ () => removeFavorite(meal) }
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  src={ blackHeartIcon }
                  className="fav-btn"
                >
                  <img src={ blackHeartIcon } alt="blackHeartIcon" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="favorite-card" key={ `${index}-recipe-card` }>
            <Link
              to={ `/bebidas/${meal.id}` }>
              <div
                className="favorite-recipe-card"
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  src={ meal.image }
                  data-testid={ `${index}-horizontal-image` }
                  alt={ meal.name }
                />
              </div>
            </Link>
            <div>
              <div className="recipe-name">
                <Link to={ `/bebidas/${meal.id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>{ meal.name }</p>
                </Link>
                <span data-testid={ `${index}-horizontal-top-text` }>
                  { meal.alcoholicOrNot }
                </span>
              </div>
              <div className="favorite-card-buttons">
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                src={ shareIcon }
                onClick={ () => shareButtonClick(meal) }
                className="share-btn"
              >
                { (copied[meal.id]) ? <p>Link copiado!</p> : (
                  <img src={ shareIcon } alt="Compartilhar" />
                ) }
              </button>
              <button
                type="button"
                onClick={ () => removeFavorite(meal) }
                data-testid={ `${index}-horizontal-favorite-btn` }
                src={ blackHeartIcon }
                className="fav-btn"
              >
                <img src={ blackHeartIcon } alt="blackHeartIcon" />
              </button>
            </div>
            </div>
          </div>
        )))}
    </div>
  );
}

export default FavoriteRecipes;
