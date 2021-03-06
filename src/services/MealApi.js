export async function fetchMealApi({ searchText, filter }) {
  if (filter === 'ingredient') {
    const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchText}`)
      .then((data) => data.json());
    return apiResponse.meals;
  }
  if (filter === 'name') {
    const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`)
      .then((data) => data.json());
    return apiResponse.meals;
  }
  if (filter === 'firstLetter') {
    const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchText}`)
      .then((data) => data.json());
    return apiResponse.meals;
  }
}

export async function fetchMealsCategories() {
  const apiResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
    .then((data) => data.json());
  return apiResponse.meals;
}

export async function fetchMealsByCategory(category) {
  const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    .then((data) => data.json());
  return apiResponse.meals;
}

export async function fetchMealsWithId(id) {
  const apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((data) => data.json());
  return apiResponse.meals;
}

export async function fetchMealRecomendation() {
  const apiResponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    .then((data) => data.json());
  return apiResponse.meals;
}

export async function fetchIngredients() {
  const apiResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    .then((data) => data.json());
  return apiResponse.meals;
}

export const fetchRandomMeal = async () => {
  const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then((response) => response.json());
  return meals[0];
};

export async function fetchAreas() {
  const apiResponse = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    .then((data) => data.json());
  return apiResponse.meals;
}

export async function fetchMealsByArea(area) {
  const { meals } = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    .then((response) => response.json());
  return meals;
}
