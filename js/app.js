// Initialization of the variables and DOM.

const nickInput = document.getElementById("nick");
const sizeInput = document.getElementById("size");
const entryForm = document.getElementById("entryForm");
const error = document.getElementById("error");

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
//Event Initialization
entryForm.addEventListener("submit",checkForm);
