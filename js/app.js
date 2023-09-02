/*
* This is the main file of the application.
* JS to manage the form
*
* @author Vladimir Curiel <vladimircuriel@outllook.com>
* @link https://github.com/NightmareVCO/HTML-CSS-JS
*/

//  global variables
//user
let nickInput;
let emailInput;
let sizeInput;
let user;
// document
let entryForm;
let error;
let avatarItems;
let itemImg;
let avatarContainer;
// Event Listeners functions
/**
 * Checks the form inputs and returns true if the form is valid, false otherwise.
 *
 * @param {Event} event - The event object triggered by the form submission.
 * @return {boolean} Returns true if the form is valid, false otherwise.
 */
function checkForm(event) {

   if (nickInput.value.match(/(?<!\s)[0-9]/)) {
      nickInput.focus(); // Sets the focus to the nickname input
      event.preventDefault(); // Prevents the form from being submitted
      error.innerText = "Nickname cannot start with a number"; // Sets the error message
      return false;
   } else if (sizeInput.value == "") {
      sizeInput.focus();
      event.preventDefault();
      error.innerText = "Please select the size";
      return false;
   }
   return true;
}

/**
 * Sets the user object with the values from the input fields.
 *
 * @param {string} nickInput - The nickname of the user.
 * @param {string} emailInput - The email address of the user.
 * @param {string} sizeInput - The size of the user.
 * @return {undefined} This function does not return anything.
 */
function setUser() {
   user = {
      nickName: nickInput,
      email: emailInput,
      size: sizeInput,
      avatar: avatarContainer
   };
}

/**
 * Sets the data by calling the 'setUserData', 'getUserData', and 'usersList' functions.
 *
 * @param {type} user - the user data to be set
 * @return {type} - the return value of the last function called
 */
function setData() {
   setUser();
   setUserData(user);
   getUserData();
   usersList();
}

/**
 * Initializes the DOM elements for user input and document manipulation.
 *
 * @param {Object} nickInput - The input element for the user's nickname.
 * @param {Object} emailInput - The input element for the user's email.
 * @param {Object} sizeInput - The input element for the user's desired size.
 * @param {Object} entryForm - The form element for user entry.
 * @param {Object} error - The element to display error messages.
 * @return {void} This function does not return anything.
 */
function DOMInit() {
   // user
   nickInput = document.getElementById("nick");
   emailInput = document.getElementById("email");
   sizeInput = document.getElementById("size");
   // document
   entryForm = document.getElementById("entryForm");
   error = document.getElementById("error");
   avatarItems = document.getElementsByClassName("avatarImgItem");
   avatarContainer = document.getElementById("avatarImg");
}

/**
 * Checks for any error stored in the sessionStorage and displays it if found.
 *
 * @param {string} error - The error message to be displayed.
 * @return {void} This function does not return anything.
 */
function checkError() {
   if (sessionStorage.getItem("error") != null) {
      error.innerText = sessionStorage.getItem("error");
      sessionStorage.removeItem("error");
   }
}

/**
 * A function that handles the event when an image is dragged.
 *
 * @param {Event} event - The event object that triggered the function.
 */
function draggedImg(event) {
   itemImg = event.target;
}

/**
 * Drops the image from the event onto the avatar container.
 *
 * @param {Event} event - The event containing the image being dropped.
 * @return {undefined} This function does not return a value.
 */
function dropImg(event) {
   avatarContainer.src = itemImg.src;
}

//Event Initialization
function main() {
   DOMInit();
   checkError();

   // Event Listeners
   // Form
   entryForm.addEventListener("submit", (event) => {
      if (checkForm(event))
         setData();
   });

   // Drag and drop
   for (let item of avatarItems)
      item.addEventListener("dragstart", draggedImg);
   // to do the drop
   avatarContainer.addEventListener("dragover", event => event.preventDefault());
   avatarContainer.addEventListener("drop", dropImg);
}

document.addEventListener('DOMContentLoaded', main);

// location
geoLocation();
