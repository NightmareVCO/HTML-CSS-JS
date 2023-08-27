/*
* This is the main file of the application.
* JS to manage the form
*
* @author Vladimir Curiel <vladimircuriel@outllook.com>
* @link https://github.com/NightmareVCO/HTML-CSS-JS
*/


// Initialization of the variables and DOM.

// user
const nickInput = document.getElementById("nick");
const emailInput = document.getElementById("email");
const sizeInput = document.getElementById("size");

const user = {
   nickName: nickInput,
   email: emailInput,
   size: sizeInput,
};

// document
const entryForm = document.getElementById("entryForm");
const error = document.getElementById("error");

// Check if there are errors in the sessionStorage.
if (sessionStorage.getItem("error") != null)
{
   error.innerText = sessionStorage.getItem("error");
   sessionStorage.removeItem("error");
}

// Event Listeners functions
/**
 * Checks the form inputs and returns true if the form is valid, false otherwise.
 *
 * @param {Event} event - The event object triggered by the form submission.
 * @return {boolean} Returns true if the form is valid, false otherwise.
 */
function checkForm(event) {

   if (nickInput.value.match(/(?<!\s)[0-9]/))
   {
      nickInput.focus(); // Sets the focus to the nickname input
      event.preventDefault(); // Prevents the form from being submitted
      error.innerText = "Nickname cannot start with a number"; // Sets the error message
      return false;
   } else if (sizeInput.value == "")
   {
      sizeInput.focus();
      event.preventDefault();
      error.innerText = "Please select the size";
      return false;
   }
   return true;
}

/**
 * Sets the data by calling the 'setUserData', 'getUserData', and 'usersList' functions.
 *
 * @param {type} user - the user data to be set
 * @return {type} - the return value of the last function called
 */
function setData() {
   setUserData(user);
   getUserData();
   usersList();
}

//Event Initialization
entryForm.addEventListener("submit",function (event) {
   if (checkForm(event))
      setData();
});

// location
geoLocation();
