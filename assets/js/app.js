// clear local storage
// localStorage.clear();

// VARIABLES

const listaTweets = document.getElementById('lista-tweets');

// EVENT LISTENERS

eventListeners();

function eventListeners() {
    // cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet)
    // Borrar Tweets
    listaTweets.addEventListener('click', borrarTweet);
    // contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}

// FUNCIONES

// Añadir tweet del formulario
function agregarTweet(e) {
    // previene la acción por defecto
    e.preventDefault();
    // leer valor de textarea
    const tweet = document.getElementById('tweet').value;
    // crear boton de eliminar
    const botonBorrar = document.createElement('a');
    // añade clase a botonBorrar
    botonBorrar.classList = 'borrar-tweet';
    // añade texto a botonBorrar
    botonBorrar.innerText = 'X';
    // crear elemento
    const li = document.createElement('li');
    // añade el texto al li
    li.innerText = tweet;
    // añade el boton de borrar al tweet
    li.appendChild(botonBorrar);
    // añade el tweet a la lista
    listaTweets.appendChild(li);
    // añadir a localStorage
    agregarTweetLocalStorage(tweet);
}
// Elimina el tweet del DOM
function borrarTweet(e) {
    e.preventDefault();
    if(e.target.className === 'borrar-tweet') {
        e.target.parentElement.remove();
        alert(`Eliminaste el tweet: ${e.target.parentElement.firstChild.textContent}`)
        borrarTweetLocalStorage(e.target.parentElement.innerText);

    } 
}

// Mostrar datos de LocalStorage en la lista
function localStorageListo() {
    let tweets;

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet) {
         // crear boton de eliminar
         const botonBorrar = document.createElement('a');
         botonBorrar.classList = 'borrar-tweet';
         botonBorrar.innerText = 'X';

         // Crear elemento y añadirle el contenido a la lista
         const li = document.createElement('li');
         li.innerText = tweet;
         // añade el botón de borrar al tweet
         li.appendChild(botonBorrar);
         // añade el tweet a la lista
         listaTweets.appendChild(li);
    });
}
// Agrega tweet al LocalStorage
function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    // Añadir el nuevo tweet
    tweets.push(tweet);
    // convertir de string a arregalo para local storage
    localStorage.setItem('tweets', JSON.stringify(tweets) );
}

// comprobar que haya elementos en local storage, retorna un arreglo
function obtenerTweetsLocalStorage() {
    let tweets;
    // revisamos los valores de local storage
    if(localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets') );
    }
    return tweets;
}

// eliminar tweet de local storage

function borrarTweetLocalStorage(tweet) {
    let tweets, tweetBorrar;
    // elimina la X del tweet
    tweetBorrar = tweet.substring(0, tweet.length - 1);
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(function(tweet, index) {
        if(tweetBorrar === tweet) {
            tweets.splice(index, 1)
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets) );
}
