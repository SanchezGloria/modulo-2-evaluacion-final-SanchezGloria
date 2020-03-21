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

// const getFromLocalStorage = () => {
//   const favoritesSaved = JSON.parse(localStorage.getItem('favorites'));
//   if (favoritesSaved !== null) {
// favoritesArray = favoritesSaved;
// volver a pintar
//   }else{
// getFromApi();
// };

// HACEMOS EL FETCH EN EL API PARA TENER NUESTRA LISTA DE SERIES

function getFromApi(ev) {
  ev.preventDefault();
  fetch(`http://api.tvmaze.com/search/shows?q=${inputElement.value}`)
    .then(response => response.json())
    .then(data => {
      // console.log(data[0].show.name);
      seriesArray = data;
      console.log('EN EL FETCH', seriesArray);

      // for (const show of data) {
      //   seriesArray = show.show;
      //   // console.log('EN EL FOR DEL FETCH', seriesArray);
      //   // console.log(show.show.name);
      //   // console.log(show.show.image.original);
      //   // seriesArray.push(show.show.name);
      //   // seriesArray.push(show.show.image.original);
      // }
      paintResultSeries();
    });
}

// FUNCIÓN PARA PINTAR RESULTADOS DE SERIES SERIES

function paintResultSeries() {
  console.log('PAINT RESULTS', seriesArray);
  // const series = document.querySelectorAll('.js-item-result');
  resultList.innerHTML = '';
  for (const show of seriesArray) {
    // console.log(show.show.image.original);
    let htmlCode = `<li class="js-item-result" id="${show.show.id}">`;
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

  // selectSerie();
}

function selectSerie(ev) {
  console.log('currentTarget', ev.currentTarget);
  console.log(ev.currentTarget.id, seriesArray[0].show.id);
  const clickedId = parseInt(ev.currentTarget.id);
  ev.currentTarget.classList.toggle('js-selected');

  // se me añade la última y se acumula en cada click la anterior más la siguiente
  let serieIndex = seriesArray.findIndex(serie => serie.show.id === clickedId);
  let favindex = favoritesArray.findIndex(serie => serie.id === clickedId);
  if (favindex === -1) {
    favObject.favname = seriesArray[serieIndex].show.name;
    if (seriesArray[serieIndex].show.image === null) {
      favObject.favimg = 'https://via.placeholder.com/210x295/ffffff/666666/?';
    } else {
      favObject.favimg = seriesArray[serieIndex].show.image.medium;
    }
    favObject.id = seriesArray[serieIndex].show.id;
    favoritesArray.push(favObject);
    console.log(favObject);
    paintFavorite(favObject);
  } else {
    // LO SACA DEL ARRAY PERO AÚN ESTÁ PINTADO EN FAVORITOS. HAY QUE BORRARLO

    favoritesArray.splice(favindex, 1);
  }
  console.log(favoritesArray);
}

function paintFavorite(item) {
  // console.log(favoritesArray);
  // favList.innerHTML = '';
  let htmlCode = `<li class="js-item-result" id="${'fav' + item.id}">`;
  htmlCode += `<h3 class="js-item-result-title">${item.favname}</h3>`;
  htmlCode += `<img class="js-item-result-img" src="${item.favimg}" alt="${item.favname}"></li>`;
  favList.innerHTML += htmlCode;
}

function selectFavorite() {
  const series = document.querySelectorAll('.js-item-result');

  for (const serie of series) {
    serie.addEventListener('click', selectSerie);
  }
}

// LISTENER BOTÓN INPUT

// buttonElement.addEventListener('click', paintResultSeries);

buttonElement.addEventListener('click', getFromApi);

// GUARDAR EN EL LOCAL STORAGE

const setInLocalStorage = () => {
  localStorage.setItem('favorites', JSON.stringify(favoritesArray));
};

// setInLocalStorage();
