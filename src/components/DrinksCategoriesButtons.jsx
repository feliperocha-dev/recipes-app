import React, { useContext } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';
import '../styles/components/CategoriesButtons.css';

const BUTTONS_LIMIT = 5;

function DrinksCategoriesButtons() {
  const {
    cocktailsCategories,
    handleCocktailCategoryClick,
  } = useContext(RecipesAppContext);
  return (
    <div className="categories-buttons-scroll-box">
      <div className="scroll-box-wrapper">
        <div className="scroll-box-container" role="list">
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ handleCocktailCategoryClick }
          >
            All
          </button>
          { cocktailsCategories
            .map(({ strCategory }, index) => (index < BUTTONS_LIMIT) && (
              <button
                type="button"
                data-testid={ `${strCategory}-category-filter` }
                key={ `${strCategory}-category-filter` }
                onClick={ handleCocktailCategoryClick }
              >
                { (strCategory === 'Other/Unknown')  ? 'Other' : strCategory }
              </button>
            )) }
        </div>
      </div>
    </div>
  );
}

export default DrinksCategoriesButtons;