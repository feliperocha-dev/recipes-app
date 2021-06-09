import React, { useContext } from 'react';
import RecipesAppContext from '../context/RecipesAppContext';
import '../styles/components/CategoriesButtons.css';

const BUTTONS_LIMIT = 5;

function MealsCategoriesButtons() {
  const {
    handleMealCategoryClick,
    mealsCategories,
  } = useContext(RecipesAppContext);
  return (
    <div className="categories-buttons-scroll-box">
      <div className="scroll-box-wrapper">
        <div className="scroll-box-container" role="list">
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ handleMealCategoryClick }
          >
            All
          </button>
          { mealsCategories
            .map(({ strCategory }, index) => (index < BUTTONS_LIMIT) && (
              <button
                type="button"
                data-testid={ `${strCategory}-category-filter` }
                key={ `${strCategory}-category-filter` }
                onClick={ handleMealCategoryClick }
              >
                { strCategory }
              </button>)) }
        </div>
      </div>
    </div>
  );
}

export default MealsCategoriesButtons;
