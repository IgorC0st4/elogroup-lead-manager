class UserController {
  static fetchUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  static saveUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

export default UserController;
