// Initialization of the variables and DOM.
const nickInput = document.getElementById("nick");
const sizeInput = document.getElementById("size");
const entryForm = document.getElementById("entryForm");
const error = document.getElementById("error");

console.log("🚀 ~ file: app.js:9 ~ sessionStorage.getItem:",sessionStorage.getItem("error"));
// Check if there are errors in the sessionStorage.
if (sessionStorage.getItem("error") != null)
{
   error.innerText = sessionStorage.getItem("error");
   sessionStorage.removeItem("error");
}

// Event Listeners functions
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

function saveData() {
   setUserData(nickInput);
   usersList(nickInput);
}

//Event Initialization
entryForm.addEventListener("submit",function (event) {
   if (checkForm(event))
      saveData();
});
