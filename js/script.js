function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

function listaPalabras (basePalabras){
    var cantidadPalabras = getRandomInt(0, basePalabras.length);
    return basePalabras[cantidadPalabras];
}

var basePalabras = ["VIVIR","UNIVERSIDAD","PROYECTO","PAGINA","HOLA","SISTEMAS","INFORMACION"];
var botonInicioPresionado = false;
var palabraRandom;
var arrayLetrasCorrectas = [];
var arrayLetrasIncorrectas =[];
var finalJuego;