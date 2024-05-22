var pantalla = document.querySelector("canvas");   //Esta línea declara una variable llamada pantalla y le asigna el primer elemento HTML que coincida con el selector CSS "canvas". El elemento canvas en HTML define un área rectangular donde se pueden dibujar gráficos utilizando JavaScript. En resumen, esta línea encuentra el elemento <canvas> en la página web y lo almacena en la variable pantalla.
var pincel = pantalla.getContext("2d");   /*Esta línea declara otra variable llamada pincel y le asigna el contexto de dibujo 2D del elemento pantalla. El contexto de dibujo proporciona métodos para dibujar formas, líneas, texto y otros elementos gráficos en el lienzo. En resumen, esta línea recupera el contexto de dibujo 2D asociado con el elemento canvas y lo almacena en la variable pincel.*/ 

pincel.lineWidth = 3;  //lineWidth: Esta es una propiedad del objeto pincel que controla el grosor de las líneas dibujadas con ese pincel.

function drawBase(){
  pincel.fillStyle = "lightgrey";
  pincel.fillRect (0,0,1200,800);

  pincel.beginPath();
  pincel.moveTo(150,400);
  pincel.lineWidth = 3;
  pincel.lineTo(100,450);
  pincel.lineTo(200,450);
  pincel.closePath();          // base 
  pincel.stroke();
}

// Con todas estas funciones es que se va a ir creando el personaje ahorcado
  function drawColumna() {
    pincel.moveTo(150,400);
    pincel.lineTo(150,100);      // linea columna
    pincel.stroke();
  }

  function drawSoga() {
    pincel.moveTo(150,100);
    pincel.lineTo(300,100);      // linea horizontal
    pincel.lineTo(300,140);      //soga
    pincel.stroke();
  }

  function drawCabeza(){
    pincel.beginPath();
    pincel.arc(300,170,30,0,Math.PI*2,true); // Cabeza
    pincel.stroke();
  }

  function drawTorso () {
    pincel.moveTo(300,200);
    pincel.lineTo(300,320);      //torso
    pincel.stroke();
  }

  function drawPiernaIzq (){
    pincel.moveTo(300,320);      
    pincel.lineTo(250,400);      // pierna izq  
    pincel.stroke();
  }

  function drawPiernaDer (){
    pincel.moveTo(300,320);      
    pincel.lineTo(350,400);      // pierna der  
    pincel.stroke();
  }

  function drawBrazoIzq (){      
    pincel.moveTo(300,260);
    pincel.lineTo(230,190);      //brazo izq
    pincel.stroke();
  }

  function drawBrazoDer (){      
    pincel.moveTo(300,260);
    pincel.lineTo(370,190);      //brazo izq
    pincel.stroke();
  }

  // Funcion que crea los guiones donde se van a colocar las letras

  function drawGuiones(palabraSecreta){
    var separacion = 450;
    
    pincel.clearRect(0,0,1200,800);
    drawBase();
    pincel.beginPath();
    pincel.moveTo(separacion,400);
    pincel.lineWidth = 3;
    for(i=0; i < palabraSecreta.length; i++){
      pincel.lineTo(separacion + 40,400);
      pincel.stroke();
      separacion = separacion + 50;
      pincel.moveTo(separacion,400);
    }
  }

  // Funcion que detecta que se introdujo una letra correcta y la coloca en su lugar correspondiente con un color verde
  function drawLetraCorrecta(palabraSecreta, letra){
    var separacion = 450;
    pincel.font = "30px Comic Sans MS";
    pincel.fillStyle = "green";

    for(i=0; i < palabraSecreta.length; i++){
      if (palabraSecreta[i] == letra){
          pincel.fillText(palabraSecreta[i],separacion + 10,390);
      }
      separacion = separacion + 50;
      pincel.moveTo(separacion,400);
    }
    pincel.stroke();
  }

  // Funcion que detecta que se introdujo una letra incorrecta y la coloca fuera de lugar con un color rojo

  function drawLetraIncorrecta(arrayLetrasIncorrectas){
    var separacion = 550;
    pincel.font = "25px Comic Sans MS";
    pincel.fillStyle = "red";

    for(g=0; g < arrayLetrasIncorrectas.length; g++){
      pincel.fillText(arrayLetrasIncorrectas[g],separacion,300);
      separacion = separacion + 30;
      pincel.moveTo(separacion,300);
    }
    pincel.stroke();
    
    if (arrayLetrasIncorrectas.length == 1){
      drawColumna();
    }
    if (arrayLetrasIncorrectas.length == 2){
      drawSoga();
    }
    if (arrayLetrasIncorrectas.length == 3){
      drawCabeza();
    }
    if (arrayLetrasIncorrectas.length == 4){
      drawTorso();
    }
    if (arrayLetrasIncorrectas.length == 5){
      drawPiernaDer();
    }
    if (arrayLetrasIncorrectas.length == 6){
      drawPiernaIzq();
    }
    if (arrayLetrasIncorrectas.length == 7){
      drawBrazoDer();
    }
    if (arrayLetrasIncorrectas.length == 8){
      drawBrazoIzq();
    }
  }

  function drawFinJuego(texto){

    pincel.font = "40px Comic Sans MS";
    if(texto == "Fin del Juego!"){
      pincel.fillStyle ="red";
    }else{
      pincel.fillStyle = "green";
    }
    pincel.fillText(texto,520,150);
    pincel.stroke();
  }

  drawBase();