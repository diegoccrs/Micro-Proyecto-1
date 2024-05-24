var rachaNum = 0;
var puntuacionNum = 0;
var intentoNum = 1


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

function agregarLetra (arrayLetras, keyName){
  var repetido = false;

  if (arrayLetras[0] == ""){
          arrayLetras.push(keyName);
  }else{
      for (i=0; i < arrayLetras.length; i++){
          if (keyName == arrayLetras[i]){
              repetido = true;
          }
      }
      if (!repetido){
          arrayLetras.push(keyName);
      }
  }
  return arrayLetras;
};

function finJuego (cantidadIntentos){
  var fin = false;
  if (cantidadIntentos == 9){
      fin = true;
  }
  return fin;
}

function ganador (palabraRandom, aciertos){
  var fin = false;

  if (aciertos.length != 0){
      fin = true;
      for (i=0; i < palabraRandom.length; i++){
          if (fin){
              for(j=0; j<aciertos.length; j++){
                  if (palabraRandom[i] == aciertos[j]){
                      fin = true;
                      break;
                  }else{
                      fin = false;
                  }
              }
          }else{
              break;
          }
      }
  }
  return fin;
}

function validarCaracter(caracter){
  var valido = false;
  const patron = new RegExp("[A-ZÑ]");
  if (caracter.length == 1 && botonInicioPresionado && patron.test(caracter)){
      valido = true;
  }
  return valido;
}

function validarTexto (texto){
  const patron = new RegExp("[A-ZÑ]$");
  const espacio = /\s/;
  var valido = false;
  if (patron.test(texto) && !espacio.test(texto)){
      valido = true;
  }
  return valido;
}


//secuencia principal
document.addEventListener('keydown', function(event){
  var keyName = event.key;
  keyName = keyName.toUpperCase();

  if (!finalJuego){
      if (validarCaracter(keyName)){
          const buscar = new RegExp(keyName);
          if (buscar.test(palabraRandom)){
              agregarLetra(arrayLetrasCorrectas,keyName)
          }else{
              agregarLetra(arrayLetrasIncorrectas,keyName)
          }
      }

      for (j=0; j < arrayLetrasCorrectas.length; j++){
          drawLetraCorrecta(palabraRandom,arrayLetrasCorrectas[j]);
      }

      drawLetraIncorrecta(arrayLetrasIncorrectas);

      if (finJuego (arrayLetrasIncorrectas.length)){
          drawFinJuego("Fin del Juego!");
          document.getElementById("input-text").style.display = "block";
          document.getElementById("btn-iniciar").textContent = "INICIAR JUEGO";
          puntuacionNum = 0;
          rachaNum = 0;

          finalJuego = true;

          //añadir a la tabla
          appendRow();
          intentoNum++;
      }

      if (ganador(palabraRandom,arrayLetrasCorrectas) && !finalJuego){
            drawFinJuego("Ganaste, Felicidades");
            document.getElementById("input-text").style.display = "block";
            finalJuego = true;

            //racha y puntaje
            definirPuntaje();
            }
      definirIntento();      
  }
      
});

function appendRow() {
    // Get the table body
    var tbody = document.querySelector(".stats-table table tbody");
  
    // Create a new row and cells
    var row = document.createElement("tr");
    var numberCell = document.createElement("td");
    var scoreCell = document.createElement("td");
    var winStreakCell = document.createElement("td");
  
    // Set the cell text
    numberCell.textContent = intentoNum;
    scoreCell.textContent = puntuacionNum;
    winStreakCell.textContent = rachaNum;
  
    // Append the cells to the row
    row.appendChild(numberCell);
    row.appendChild(scoreCell);
    row.appendChild(winStreakCell);
  
    // Append the row to the table body
    tbody.appendChild(row);
  }

function definirPuntaje(){
    var racha = document.querySelector("#racha");
    var puntuacion = document.querySelector("#puntuacion");
    

    rachaNum++;
    puntuacionNum = puntuacionNum + (10-arrayLetrasIncorrectas.length)*10;

    racha.textContent = "Racha: " + rachaNum;
    puntuacion.textContent = "Puntuación: " + puntuacionNum;
}

function definirIntento(){
    var intento = document.querySelector("#intentos");
    intento.textContent = "INTENTOS: " + (9-arrayLetrasIncorrectas.length);
    console.log(9-arrayLetrasIncorrectas.length);
}


document.addEventListener("DOMContentLoaded", function () { 
  document.getElementById("input-text").style.display = "block";
});

var iniciarJuego = document.querySelector("#btn-iniciar");
iniciarJuego.addEventListener("click", function (evt){
  evt.preventDefault();
  
  arrayLetrasCorrectas = [];
  arrayLetrasIncorrectas =[];
  finalJuego = false;

  document.getElementById("input-text").style.display = "none";
  iniciarJuego.textContent = "CONTINUAR";
  palabraRandom = listaPalabras(basePalabras);
  console.log(palabraRandom);

  drawGuiones(palabraRandom);
  botonInicioPresionado = true;
  
  console.log(basePalabras);
});

//cada vez que se refresca la pagina se carga en la lista de palabras la ultima ingresada
// por el usuario
(()=>{
  if (localStorage.getItem("palabraNueva"+ basePalabras.length) != null){
      for(i=0; i < localStorage.length; i++){
          basePalabras.push(localStorage.getItem("palabraNueva"+basePalabras.length));
      }
  }
})();

//BOTON AGREGAR
var btnAgregar = document.querySelector("#btn-agregar");
btnAgregar.addEventListener("click", function(evt){
  evt.preventDefault();
  var palabraRepetida = false;
  botonInicioPresionado = false;
  var agregarPalabra = document.querySelector("#agregar-palabra");
  var palabraNueva = agregarPalabra.value.toUpperCase();
 
  

  if (validarTexto(palabraNueva)){
      for(j=0; j < basePalabras.length; j++){
          if (basePalabras[j] == palabraNueva){
              palabraRepetida = true;
              break;
          }
      };
      for(i=0; i < localStorage.length; i++){
          if (localStorage.getItem("palabraNueva"+basePalabras.length) == palabraNueva){
              palabraRepetida = true;
              break;
          }
      };

      if (!palabraRepetida){
          localStorage.setItem("palabraNueva" + basePalabras.length,palabraNueva);
          basePalabras.push(palabraNueva);
      };
  };
  
  agregarPalabra.value = "";
})

//BOTON REINICIAR
let btnReiniciar = document.getElementById("btn-reiniciar");

btnReiniciar.addEventListener("click", function() {
// Get the "btn-iniciar" button
    let btnIniciar = document.getElementById("btn-iniciar");

    // Set the text of the "btn-iniciar" button
    btnIniciar.textContent = "INICIAR JUEGO";
    document.getElementById("input-text").style.display = "block";
    // Set rachaNum and puntuacionNum to 0
    rachaNum = 0;
    puntuacionNum = 0;
});

