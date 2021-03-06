import React, { useContext } from 'react';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import BottomMenu from '../components/BottomMenu';
import RecipesAppContext from '../context/RecipesAppContext';
import '../styles/pages/MainPage.css';
import Loading from '../components/Loading';
import DrinksCategoriesButtons from '../components/DrinksCategoriesButtons';

const CARDS_LIMIT = 12;

function MainDrinks() {
  const {
    cocktailsRecipes,
    redirect,
    isFetching,
    isFetchingCategories,
  } = useContext(RecipesAppContext);
  return (
    <>
      <Header />
      <div className="main-page-container">
        { (redirect) && <Redirect to={ `/bebidas/${cocktailsRecipes[0].idDrink}` } /> }
        { !(isFetchingCategories) && (<DrinksCategoriesButtons />) }
        { (!(isFetching) && (cocktailsRecipes !== null)) && (
          <div className="recipes-container">
            { cocktailsRecipes.map((drink, index) => ((index < CARDS_LIMIT) && (
              <Link
                to={ `/bebidas/${drink.idDrink}` }
                key={ `${index}-recipe-card` }
              >
                <div className="recipe-card" data-testid={ `${index}-recipe-card` }>
                  <img
                    src={ drink.strDrinkThumb }
                    data-testid={ `${index}-card-img` }
                    alt={ drink.strDrink }
                  />
                  <div>
                    <p data-testid={ `${index}-card-name` }>{ drink.strDrink }</p>
                  </div>
                </div>
              </Link>)
            )) }
          </div>
        ) }
        { (!(isFetching) && cocktailsRecipes === null) && (
          <p className="not-found-message">Drink Not Found</p>
        ) }
        { ((isFetching) || (isFetchingCategories)) && <Loading /> }
      </div>
      <BottomMenu />
    </>
  );
}

export default MainDrinks;
