
let nickName;

// SessionStorage (while logged in)
function setUserData(nickName) {
   sessionStorage.setItem("nickName",nickName.value);
}

function getUserData() {
   nickName = sessionStorage.getItem("nickName");
}

function checkUserData() {
   if (nickName == null)
   {
      sessionStorage.setItem('error','You must fill the form first!');
      return false;
   }
   return true;
}

// LocalStorage
function createUserData(nickName) {
   const user = {
      userName: nickName.value,
      date: Date.now()
   };
   return user;
}

function getUserList() {
   let userList = JSON.parse(localStorage.getItem("userList"));
   return userList || [];
}

function usersList(nickName) {
   const user = createUserData(nickName);
   let userList = getUserList();

   userList.push(user);
   localStorage.setItem("userList",JSON.stringify(userList));
}