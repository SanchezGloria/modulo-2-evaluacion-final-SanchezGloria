console.log('Empezamos!');

// DECLARAMOS VARIABLES Y ARRAYS PRIMARIOS

const buttonElement = document.querySelector('.js-btn');
const inputElement = document.querySelector('.js-input');
const resultList = document.querySelector('.js-result-list');
const favList = document.querySelector('.js-favs');
let seriesArray = [];
let favoritesArray = [];
let idSerie;
// resultList.innerHTML = 'hola';
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
  const series = document.querySelectorAll('.js-item-result');
  resultList.innerHTML = '';
  for (const show of seriesArray) {
    console.log(show.show.image.original);
    // resultList.innerHTML += show.show.name;
    let htmlCode = `<li class="js-item-result" id="${show.show.id}">`;
    htmlCode += `<h3 class="js-item-result-title">${show.show.name}</h3>`;
    htmlCode += `<img class="js-item-result-img" src="${show.show.image.medium}" alt="${show.show.name}"></li>`;
    // // console.log('SHOW', results);
    resultList.innerHTML += htmlCode;
    selectFavorite();
  }

  // selectSerie();
  // seriesArray = [];
  // for (const show of data) {
  // }
}

function selectSerie(ev) {
  console.log('FUERA DEL FOR currentTarget', ev.currentTarget);
  console.log(ev.currentTarget.id);
  // console.log('FUERA DEL FOR target', ev.Target);
  ev.currentTarget.classList.toggle('js-selected');
  const title = document.querySelector('.js-item-result-title');
  const img = document.querySelector('.js-item-result-img');
  console.log(img);

  favItemObject = {
    favname: title.innerHTML,
    favimg: img.scr
  };
  console.log(favItemObject.favimg);
  let index = favoritesArray.indexOf(ev.currentTarget.id);
  if (index === -1) {
    favoritesArray.push(favItemObject);
    console.log(favoritesArray);
    // paintFavorites();
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
  // for (const show of seriesArray) {
  //   // idSerie = show.show.id;
  //   // const series = document.getElementById(`${show.show.id}`);
  //   // // console.log(idSerie);
  // }
}

function paintFavorites() {
  // favList.innerHTML = '';
  // for (const show of seriesArray) {
  //   let htmlCode = `<li class="js-item-result" id="${show.show.id}">`;
  //   htmlCode += `<h3 class="js-item-result-title">${show.show.name}</h3>`;
  //   htmlCode += `<img class="js-item-result-img" src="${show.show.image.medium}" alt="${show.show.name}"></li>`;
  //   // // console.log('SHOW', results);
  //   favList.innerHTML += htmlCode;
  // }
}

function selectFavorite() {
  const series = document.querySelectorAll('.js-item-result');
  console.log(series);
  for (const serie of series) {
    serie.addEventListener('click', selectSerie);
  }
}

// LISTENER BOTÓN INPUT

// buttonElement.addEventListener('click', paintResultSeries);

buttonElement.addEventListener('click', getFromApi);

// getFromApi();
