import React, { useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RecipesAppContext from '../context/RecipesAppContext';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import '../styles/components/Header.css';

function toUpperCaseFirstLetter(str) {
  const arr = str.split('');
  arr[0] = str[0].toUpperCase();
  return arr.join('');
}

function refineTitle(title) {
  if ((title.includes('/')) || (title.includes('-'))) {
    const arr = title.split('')
      .map((str) => (((str === '/') || (str === '-')) ? ' ' : str));
    const newArr = arr.join('').split(' ')
      .filter((str) => (str !== ''))
      .map((str) => ((str !== 'area') ? toUpperCaseFirstLetter(str) : 'Origem'));
    if (newArr.length > 1) return `${newArr[0]} ${newArr[newArr.length - 1]}`;
    return newArr[0];
  }
  return toUpperCaseFirstLetter(title);
}

function Header() {
  const { showSearchBar, setShowSearchBar } = useContext(RecipesAppContext);
  const location = useLocation();
  let title = '';
  if (location.pathname !== '/') {
    title = refineTitle(location.pathname.slice(1));
  }

  useEffect(() => () => {
    setShowSearchBar(false);
  }, [setShowSearchBar]);

  return (
    <div className="header-container">
      <header className="header">
        <Link to="/perfil">
          <img src={ profileIcon } alt="profile" data-testid="profile-top-btn" />
        </Link>
        <h1 data-testid="page-title">{ title }</h1>
        { ((title === 'Perfil')
          || ((title.includes('Explorar') && !(title.includes('Origem'))))
          || (title.includes('Receitas'))) ? (<div />) : (
            <button type="button" onClick={ () => setShowSearchBar(!showSearchBar) }>
              <img src={ searchIcon } alt="search" data-testid="search-top-btn" />
            </button>
          ) }
      </header>
      { (showSearchBar) && (
        <div className="search-bar-container">
          <SearchBar />
        </div>
      ) }
    </div>
  );
}

export default Header;
