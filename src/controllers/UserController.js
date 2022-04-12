// Class resposible for user querying
class UserController {
  // Checks if user aleready is registered
  // If positive, parses the string and returns the object
  // Else retuns null
  static fetchUser() {
    const localStorageData = localStorage.getItem('user');
    return localStorageData ? JSON.parse(localStorageData) : null;
  }

  // Register new user by parsign the object to a string
  // So it can be saved on localstorage
  static saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export default UserController;
