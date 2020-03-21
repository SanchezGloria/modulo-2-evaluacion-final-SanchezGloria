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
  console.log(ev.currentTarget.id);
  const clickedId = ev.currentTarget.id;
  ev.currentTarget.classList.toggle('js-selected');
  // tengo que parsear porque hay dos iguales
  // funciona regular
  for (const show of seriesArray) {
    if (show.show.id == clickedId) {
      favObject.favname = show.show.name;
      favObject.favimg = show.show.image.medium;
      favObject.id = show.show.id;
      console.log(favObject);
    }
  }
  // const img = ev.currentTarget.querySelector('.js-item-result-img');

  // ESTO LO TENGO QUE SACAR DEL SERIESARRAY

  // favname: title.innerHTML,
  // favimg: img.src

  console.log(favObject);

  let index = favoritesArray.findIndex(serie => serie.id === favObject.id);
  if (index === -1) {
    favoritesArray.push(favObject);

    paintFavorites();

    // let index = favoritesArray.indexOf(favObject.id);
    // console.log(favoritesArray);
    // favList.innerHTML = '';
    // let htmlCode = `<li class="js-item-result" id="${ev.currentTarget.id}">`;
    // htmlCode += `<h3 class="js-item-result-title">${ev.currentTarget.firstElementChild.textContent}</h3>`;
    // // htmlCode += `<img class="js-item-result-img" src="${show.show.image.medium}" alt="${show.show.name}"></li>`;
    // // // console.log('SHOW', results);
    // favList.innerHTML += htmlCode;

    // favList.innerHTML += show.show.name;
  } else {
    favoritesArray.splice(index, 1);
  }
  console.log(favoritesArray);
}

function paintFavorites() {
  // console.log(favoritesArray);
  // favList.innerHTML = '';
  for (const item of favoritesArray) {
    let htmlCode = `<li class="js-item-result">`;
    htmlCode += `<h3 class="js-item-result-title">${item.favname}</h3>`;
    htmlCode += `<img class="js-item-result-img" src="${item.favimg}" alt="${item.favname}"></li>`;
    favList.innerHTML += htmlCode;
  }
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
