import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import '../styles/pages/DoneRecipes.css';

const copy = require('clipboard-copy');

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [copied, setCopy] = useState({});

  function renderMessage() {
    return (
      <span>Link copiado!</span>
    );
  }

  function shareButtonClick(id, type) {
    setCopy({ ...copied, [id]: true });
    copy(`https://recipes-app-trybe.netlify.app/${type}s/${id}`);
    renderMessage();
  }

  function handleResetFilterClick() {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(doneRecipesStorage);
  }

  function handleFoodFilterClick() {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesStorage !== null) {
      setDoneRecipes(doneRecipesStorage
        .filter(({ type }) => type === 'comida'));
    }
  }

  function handleDrinkFilterClick() {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (doneRecipesStorage !== null) {
      setDoneRecipes(doneRecipesStorage
        .filter(({ type }) => type === 'bebida'));
    }
  }

  useEffect(() => {
    const doneRecipesStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    const doneRecipesIds = {};
    if (doneRecipesStorage !== null) {
      for (let index = 0; index < doneRecipesStorage.length; index += 1) {
        doneRecipesIds[doneRecipesStorage[index].id] = false;
      }
      setDoneRecipes(doneRecipesStorage);
      setCopy(doneRecipesIds);
    }
  }, []);

  return (
    <div className="done-recipes-container">
      <Header />
      <div className="done-recipes-buttons-container">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ handleResetFilterClick }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ handleFoodFilterClick }
        >
          Food
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ handleDrinkFilterClick }
        >
          Drink
        </button>
      </div>
      { (doneRecipes !== null) && doneRecipes.map((recipe, index) => (
        <div className="done-recipe-card" key={ `${recipe.name}-${index}` }>
          <Link to={ `/${recipe.type}s/${recipe.id}` }>
            <img
              src={ recipe.image }
              alt={ recipe.name }
              className="recipe-image"
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <div className="done-recipe-text-container">
            <div className="done-recipe-text-container-top">
              <p
                data-testid={ `${index}-horizontal-top-text` }
                className="done-recipe-top-text"
              >
                { (recipe.type === 'comida') ? (`${recipe.area} - ${recipe.category}`) : (
                  `${recipe.alcoholicOrNot}`
                ) }
              </p>
              <button
                type="button"
                className="share-btn"
                onClick={ () => shareButtonClick(recipe.id, recipe.type) }
              >
                { (copied[recipe.id]) ? renderMessage() : (
                  <img
                    src={ shareIcon }
                    alt="Compartilhar"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                ) }
              </button>
            </div>
            <Link to={ `/${recipe.type}s/${recipe.id}` }>
              <p
                data-testid={ `${index}-horizontal-name` }
                className="done-recipe-title"
              >
                { recipe.name }
              </p>
            </Link>
            <p
              data-testid={ `${index}-horizontal-done-date` }
              className="done-recipe-date"
            >
              { `Feito em: ${recipe.doneDate}` }
            </p>
            { recipe.tags.map((tag) => (tag !== '') && (
              <span
                data-testid={ `${index}-${tag}-horizontal-tag` }
                key={ `${index}-${tag}-horizontal-tag` }
              >
                { tag }
              </span>
            )) }
          </div>
        </div>
      )) }
    </div>
  );
}

export default DoneRecipes;
