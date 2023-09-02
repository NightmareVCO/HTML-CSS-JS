/*
* JS to manage the game
*
* @author Vladimir Curiel <vladimircuriel@outllook.com>
* @link https://github.com/NightmareVCO/HTML-CSS-JS
*/
const colors = ["rojo", "verde", "azul", "morado"];
const scoreMultiplier = 10;
let marked = false;

let adjacentDots = [];
let markedID = [];
let sizeInt = 0;
let selectedColor = "";
let intervalID;



function getRandInteger(max) {
   return Math.floor(Math.random() * max);
}

function getRandColor() {
   return colors[getRandInteger(colors.length)];
}
/**
 * Sets the user data for the game.
 *
 * @param {string} nickName - The nickname of the user.
 * @return {void} This function does not return a value.
 */
function setUserDataGame() {
   document.getElementById("nick").value = nickName;
   document.getElementById("avatarImg").src = avatarImg;
   sizeInt = getSizeInt();
}

function createGameBoard() {
   setBoardSize();
   createDots();
}

function setBoardSize() {
   document.getElementById("juego").style.gridTemplateColumns = `repeat(${size}, 1fr)`;
   document.getElementById("juego").style.gridTemplateRows = `repeat(${size}, 1fr)`;
}

function getSizeInt() {
   return sizeInt = parseInt(size);
}

function getBoardSize() {
   return sizeInt ** 2;
}

function createDots() {
   const boardSize = getBoardSize();

   let items = "";
   let color = getRandColor();

   for (let i = 0; i < boardSize; i++) {
      if (i % 2 > 0) //Para evadir las casillas aisladas
         color = getRandColor();

      items += `<div class="containerItem"><div id="${i}" class="item ${color}"></div></div>`;
   }
   document.getElementById("juego").innerHTML = items;
}

function markDot(event) {
   const color = 1; //porque en el classlist, el elemento 1 es el color.
   let item = event.target;
   let itemID = parseInt(item.id);
   let itemContainer = event.target.parentElement;

   for (let i = 0; i < colors.length; i++)
      if (item.classList.contains(colors[i])) {
         itemContainer.classList.add(colors[i]);
         selectedColor = item.classList[color];
         break; // Salir del bucle cuando se haya encontrado el color
      }
   if (!marked)
      marked = true;

   markedID.push(itemID);
   calcAdjacentDots(parseInt(item.id));

   /*
      if (item.classList.contains("rojo"))
         itemContainer.classList.add("rojo");
      else if (item.classList.contains("verde"))
         itemContainer.classList.add("verde");
      else if (item.classList.contains("azul"))
         itemContainer.classList.add("azul");
   */
}

function continueDot(event) {
   if (marked) {
      let item = event.target;
      let itemID = parseInt(item.id);

      if (adjacentDots.includes(itemID) && item.classList.contains(selectedColor)) {
         let itemContainer = event.target.parentElement;
         for (let i = 0; i < colors.length; i++)
            if (item.classList.contains(colors[i])) {
               itemContainer.classList.add(colors[i]);
               markedID.push(itemID);
               calcAdjacentDots(parseInt(item.id));
               break; // Salir del bucle cuando se haya encontrado el color
            }
      }

   }
}

function getScore() {
   return markedID.length * scoreMultiplier;
}

function endDot() {
   if (marked)
      marked = false;
   adjacentDots = [];

   let score = document.getElementById("puntuacion");

   if (markedID.length > 1) {
      for (let i = 0; i < markedID.length; i++) {
         let markedItem = document.getElementById(markedID[i]);
         markedItem.parentElement.classList.remove(selectedColor);

         markedItem.classList.remove(selectedColor);
         markedItem.classList.add(getRandColor());
      }
      score.value = parseInt(score.value) + getScore();
   }
   else {
      for (let i = 0; i < markedID.length; i++) {
         let markedItem = document.getElementById(markedID[i]);
         markedItem.parentElement.classList.remove(selectedColor);
      }
   }



   markedID = [];

}

/**
 * Generates an array of adjacent dots based on the given markedID.
 *
 * @param {number} markedID - The ID of the marked dot.
 * @return {array} An array containing the IDs of the adjacent dots.
 *
 * reminder: just works when moving the mouse over the dots, not clicking them
 */
function calcAdjacentDots(markedID) {
   adjacentDots = [];

   // up
   if (markedID - sizeInt >= 0)
      adjacentDots.push(markedID - sizeInt);

   // down
   if (markedID + sizeInt < getBoardSize())
      adjacentDots.push(markedID + sizeInt);

   // left
   if (markedID % sizeInt != 0)
      adjacentDots.push(markedID - 1);

   // right
   if (markedID % sizeInt != sizeInt - 1)
      adjacentDots.push(markedID + 1);

   for (let i = 0; i < adjacentDots.length; i++)
      console.log(adjacentDots[i]);
}

function stopGame() {
   const items = document.getElementsByClassName("item");
   for (const item of items) {
      item.removeEventListener("mousedown", markDot);
      item.removeEventListener("mouseover", continueDot);
   }
   document.removeEventListener("mouseup", endDot);

   document.getElementById("juegoAcabado").classList.add("juegoAcabadoColor");

   document.getElementById("juegoAcabado").style.zIndex = 2;
   document.getElementById("juego").style.zIndex = 1;
   document.getElementById("nuevaPartida").addEventListener("click", () => location.reload());
}

function timer() {
   let timer = document.getElementById("tmpo");
   if (parseInt(timer.value) > 0)
      timer.value = parseInt(timer.value) - 1;
   else if (parseInt(timer.value) == 0) {
      clearInterval(intervalID);
      stopGame();
   }
}

// Events
function setEventsGame() {
   const items = document.getElementsByClassName("item");
   for (const item of items) {
      item.addEventListener("mousedown", markDot);
      item.addEventListener("mouseover", continueDot);
   }
   document.addEventListener("mouseup", endDot);

   setInterval(timer, 1000);
}

// Main
getUserData();
// check if the user data is valid
if (!checkUserData())
   location = "index.html";

setUserDataGame();
createGameBoard();
setEventsGame();