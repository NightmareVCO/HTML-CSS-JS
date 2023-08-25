// Initialization of the variables and DOM.

const nickInput = document.getElementById("nick");
const sizeInput = document.getElementById("size");
const entryForm = document.getElementById("entryForm");

// Event Listeners functions
function checkForm(event) {

   if (nickInput.value.length == 0)
   {
      console.log("Please enter your name");
      nickInput.focus(); // Sets the focus to the nickname input
      event.preventDefault(); // Prevents the form from being submitted
      return false;
   } else if (sizeInput.value == "0")
   {
      console.log("Please select the size");
      sizeInput.focus();
      event.preventDefault();
      return false;
   }
   return true;
}
//Event Initialization
entryForm.addEventListener("submit",checkForm);
