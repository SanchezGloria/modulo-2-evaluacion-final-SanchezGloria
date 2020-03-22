console.log('Empezamos!');

// DECLARAMOS VARIABLES Y ARRAYS PRIMARIOS

const buttonElement = document.querySelector('.js-btn');
const inputElement = document.querySelector('.js-input');
const resultList = document.querySelector('.js-result-list');
const favList = document.querySelector('.js-favs');
let seriesArray = [];
let favoritesArray = [];
let favObject = {};
let idSerie;

// COGER DEL LOCAL STORAGE

const getFromLocalStorage = () => {
  const favoritesSaved = JSON.parse(localStorage.getItem('favorites'));
  if (favoritesSaved !== null) {
    favoritesArray = favoritesSaved;
    for (const item of favoritesArray) {
      paintFavorite(item);
    }
  }
};

// HACEMOS EL FETCH EN EL API PARA TENER NUESTRA LISTA DE SERIES

function getFromApi(ev) {
  ev.preventDefault();
  fetch(`http://api.tvmaze.com/search/shows?q=${inputElement.value}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data[0].show.name);
      seriesArray = data;
      console.log('EN EL FETCH', seriesArray);
      paintResultSeries();
    });
}

// FUNCIÓN PARA PINTAR RESULTADOS DE SERIES

function paintResultSeries() {
  console.log('PAINT RESULTS', seriesArray);
  resultList.innerHTML = '';
  for (const show of seriesArray) {
    let htmlCode;
    let favIndex = favoritesArray.findIndex(serie => serie.id === show.show.id);
    if (favIndex === -1) {
      htmlCode = `<li class="js-item-result" id="${show.show.id}">`;
    } else {
      htmlCode = `<li class="js-item-result js-selected" id="${show.show.id}">`;
    }
    htmlCode += `<h3 class="js-item-result-title">${show.show.name}</h3>`;
    if (show.show.image === null) {
      htmlCode += `<img class="js-item-result-img" src="https://via.placeholder.com/210x295/ffffff/666666/?" alt="${show.show.name}"></li>`;
    } else {
      htmlCode += `<img class="js-item-result-img" src="${show.show.image.medium}" alt="${show.show.name}">`;
    }
    htmlCode += `</li>`;
    resultList.innerHTML += htmlCode;
  }
  selectFavorite();
}

// FUNCIÓN PARA HACER TOGGLE, CREAR OBJETO GUARDAR/BORRAR EN FAVS

function selectSerie(ev) {
  console.log('currentTarget', ev.currentTarget);
  console.log(ev.currentTarget.id, seriesArray[0].show.id);
  const clickedId = parseInt(ev.currentTarget.id);
  ev.currentTarget.classList.toggle('js-selected');
  let serieIndex = seriesArray.findIndex(serie => serie.show.id === clickedId);
  let favIndex = favoritesArray.findIndex(serie => serie.id === clickedId);
  if (favIndex === -1) {
    let favObject = {};
    favObject.favname = seriesArray[serieIndex].show.name;
    if (seriesArray[serieIndex].show.image === null) {
      favObject.favimg = 'https://via.placeholder.com/210x295/ffffff/666666/?';
    } else {
      favObject.favimg = seriesArray[serieIndex].show.image.medium;
    }
    favObject.id = seriesArray[serieIndex].show.id;
    favoritesArray.push(favObject);

    paintFavorite(favObject);
  } else {
    let favorite = favoritesArray[favIndex];
    favoritesArray.splice(favIndex, 1);
    removeFavorite(favorite);
  }
  console.log(favoritesArray);
  setInLocalStorage();
}

// FUNCIÓN PARA PINTAR FAV

function paintFavorite(item) {
  // console.log(favoritesArray);
  // favList.innerHTML = '';
  let htmlCode = `<li class="js-item-result" id="${'fav' + item.id}">`;
  htmlCode += `<h3 class="js-item-result-title">${item.favname}</h3>`;
  htmlCode += `<img class="js-item-result-img" src="${item.favimg}" alt="${item.name}">`;
  htmlCode += `</li>`;
  favList.innerHTML += htmlCode;
}

// FUNCIÓN PARA BORRAR FAV

function removeFavorite(item) {
  let eraseId = document.getElementById('fav' + item.id);
  favList.removeChild(eraseId);
}

// LISTENERS

function selectFavorite() {
  const series = document.querySelectorAll('.js-item-result');

  for (const serie of series) {
    serie.addEventListener('click', selectSerie);
  }
}

buttonElement.addEventListener('click', getFromApi);

// GUARDAR EN EL LOCAL STORAGE

const setInLocalStorage = () => {
  localStorage.setItem('favorites', JSON.stringify(favoritesArray));
};

getFromLocalStorage();
