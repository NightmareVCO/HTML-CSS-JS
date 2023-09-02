/*
* JS to manage the game
*
* @author Vladimir Curiel <vladimircuriel@outllook.com>
* @link https://github.com/NightmareVCO/HTML-CSS-JS
*/
const colors = ["rojo", "verde"];

function getRndInteger(min, max) {
   return Math.floor(Math.random() * (max - min + 1)) + min;
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
   let color;
   for (let i = 0; i < boardSize; i++) {
      if (i % 2 > 0) //Para evadir las casillas aisladas
         color = colors[getRndInteger(0, 1)];
      items += `<div class="containerItem"><div class="item ${color}"></div></div>`;
   }
   document.getElementById("juego").innerHTML = items;
}




getUserData();
// check if the user data is valid
if (!checkUserData())
   location = "index.html";

setUserDataGame();
createGameBoard();