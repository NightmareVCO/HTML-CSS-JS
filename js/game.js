/*
* JS to manage the game
*
* @author Vladimir Curiel <vladimircuriel@outllook.com>
* @link https://github.com/NightmareVCO/HTML-CSS-JS
*/
const colors = ["rojo", "verde", "azul", "morado"];

function getRandInteger(max) {
   return Math.floor(Math.random() * max);
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
   const sizeInt = parseInt(size);
   return sizeInt ** 2;
}

function createDots() {
   const boardSize = getSizeInt();

   let items = "";
   let color = 0;

   for (let i = 0; i < boardSize; i++) {
      if (i % 2 > 0) //Para evadir las casillas aisladas
         color = getRandInteger(colors.length);

      items += `<div class="containerItem"><div class="item ${colors[color]}"></div></div>`;
   }
   document.getElementById("juego").innerHTML = items;
}

function markDot(event) {
   let item = event.target;
   let itemContainer = event.target.parentElement;

   for (let i = 0; i < colors.length; i++)
      if (item.classList.contains(colors[i])) {
         itemContainer.classList.add(colors[i]);
         break; // Salir del bucle cuando se haya encontrado el color
      }
   /*
      if (item.classList.contains("rojo"))
         itemContainer.classList.add("rojo");
      else if (item.classList.contains("verde"))
         itemContainer.classList.add("verde");
      else if (item.classList.contains("azul"))
         itemContainer.classList.add("azul");
   */
}

function setEventsGame() {
   const items = document.getElementsByClassName("item");
   for (const item of items)
      item.addEventListener("mousedown", markDot);
}

getUserData();
// check if the user data is valid
if (!checkUserData())
   location = "index.html";

setUserDataGame();
createGameBoard();
setEventsGame();