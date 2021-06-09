import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import RecipesAppContext from '../context/RecipesAppContext';
import '../styles/pages/MainPage.css';
import Loading from '../components/Loading';
import MealsCategoriesButtons from '../components/MealsCategoriesButtons';

const CARDS_LIMIT = 12;

function MainFoods() {
  const {
    mealsRecipes,
    redirect,
    isFetching,
    isFetchingCategories,
  } = useContext(RecipesAppContext);
  return (
    <>
      <Header />
      <div className="main-page-container">
        { (redirect) && <Redirect to={ `/comidas/${mealsRecipes[0].idMeal}` } /> }
        { !(isFetchingCategories) && ( <MealsCategoriesButtons />) }
        { (!(isFetching) && (mealsRecipes !== null)) && (
          <div className="recipes-container">
            { mealsRecipes.map((meal, index) => ((index < CARDS_LIMIT) && (
              <Link
                to={ `/comidas/${meal.idMeal}` }
                key={ `${index}-recipe-card` }
              >
                <div className="recipe-card" data-testid={ `${index}-recipe-card` }>
                  <img
                    src={ meal.strMealThumb }
                    data-testid={ `${index}-card-img` }
                    alt={ meal.strMeal }
                  />
                  <div>
                    <p data-testid={ `${index}-card-name` }>{ meal.strMeal }</p>
                  </div>
                </div>
              </Link>)
            )) }
          </div>
        ) }
        { (!(isFetching) && mealsRecipes === null) && (
          <p className="not-found-message">Meal Not Found</p>
        ) }
        { ((isFetching) || (isFetchingCategories)) && <Loading /> }
      </div>
      <BottomMenu />
    </>
  );
}

export default MainFoods;
