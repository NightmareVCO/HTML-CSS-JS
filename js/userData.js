/*
* JS to manage user data.
*
* @author Vladimir Curiel <vladimircuriel@outllook.com>
* @link https://github.com/NightmareVCO/HTML-CSS-JS
*/

// user variables
let nickName;
let email;
let size;
let locationPlace;

// SessionStorage (while logged in)
/**
 * Stores user data in the session storage.
 * @param {Object} user - The user object.
 * @return {undefined} No return value.
 */
function setUserData(user) {
   sessionStorage.setItem("nickName",user.nickName.value);
   sessionStorage.setItem("email",user.email.value);
   sessionStorage.setItem("size",user.size.value);
   sessionStorage.setItem("location",locationPlace);
}

// Al llamar esta función tenemos lo valores directamente, no hay que pedirle nada
/**
 * Retrieves user data from sessionStorage.
 *
 * @return {undefined} No return value.
 */
function getUserData() {
   nickName = sessionStorage.getItem("nickName");
   email = sessionStorage.getItem("email");
   size = sessionStorage.getItem("size");
}

/**
 * Check user data and return true if valid, false otherwise.
 *
 * @return {boolean} Whether the user data is valid or not.
 */
function checkUserData() {
   if (nickName == null)
   {
      sessionStorage.setItem('error','You must fill the form first!');
      return false;
   }
   return true;
}

/**
 * Retrieves the user's geolocation.
 *
 * @return {string} The user's geolocation as a string in the format "Latitude: {latitude} Longitude: {longitude}" or an error message if the location cannot be retrieved.
 */
function geoLocation() {
   if (!navigator.geolocation)
      locationPlace = "Geolocation is not supported by your browser";
   else
      navigator.geolocation.getCurrentPosition(
         (success) => {
            locationPlace = "Latitude: " + success.coords.latitude + " Longitude: " + success.coords.longitude;
         }
         ,(error) => {
            locationPlace = "Unable to retrieve your location";
         });
}



// LocalStorage
/**
 * Creates user data object.
 * @returns {Object} The user data object with userName and date properties.
 */
function createUserData() {
   const user = {
      userName: nickName,
      date: Date.now()
   };
   return user;
}

/**
 * Retrieves the user list from the local storage.
 *
 * @return {Array} The user list retrieved from the local storage, or an empty array if it does not exist.
 */
function getUserList() {
   let userList = JSON.parse(localStorage.getItem("userList"));
   return userList || [];
}

/**
 * Generates a list of users and stores it in the local storage.
 *
 * @return {undefined} This function does not return a value.
 */
function usersList() {
   const user = createUserData();
   let userList = getUserList();

   userList.push(user);
   localStorage.setItem("userList",JSON.stringify(userList));
}

