document.addEventListener('DOMContentLoaded', () => {
  if (!window.location.pathname.includes('signup.html')) return;

  var form = document.getElementById('form');
  var firstnameInput = document.getElementById('firstname-input');
  var emailInput = document.getElementById('email-input');
  var passwordInput = document.getElementById('password-input');
  var repeatPasswordInput = document.getElementById('repeat-password-input');
  var errorMessage = document.getElementById('error-message');

  form.addEventListener('submit', handleFormSubmit);

  function handleFormSubmit(e) {
    e.preventDefault();
    clearError();
    var name = firstnameInput.value.trim();
    var email = emailInput.value.trim();
    var password = passwordInput.value.trim();
    var repeatPassword = repeatPasswordInput.value.trim();

    if (!validateInputs(name, email, password, repeatPassword)) return;

    if (isEmailUsed(email)) {
      showError("Email is aready exist!");
      return;
    }

    saveUser({ name, email, password });
    redirectToLogin();
  }

  function validateInputs(name, email, password, repeatPassword) {

    if (!name || !email || !password || !repeatPassword) {
      showError("all fields are required ");
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      showError("email not valid");
      return false;
    }

    if(email === '' || email == null){
    showError('Email is required')
      return false;
  }
   if(password === '' || password == null){
    showError('Password is required')
      return false;
  }

    if (password !== repeatPassword) {
      showError("Password not match!");
      return false;
    }
     if(name === '' || name == null){
    showError('Firstname is required')
      return false;
     }
    
 
  if(password.length < 8){
    showError('Password must have at least 8 characters')
      return false;
  }
    return true;
  }

  function isEmailUsed(email) {
  var usersList = JSON.parse(localStorage.getItem('users')) || [];

  for (var i = 0; i < usersList.length; i++) {
    if (usersList[i].email === email) {
      return true;
    }
  }

  return false;
}

  function saveUser(newUser) {
    var users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
  }

  function redirectToLogin() {
    window.location.href = 'login.html';
  }

  function showError(message) {
    errorMessage.textContent = message;
  }

  function clearError() {
    errorMessage.textContent = '';
  }
});


document.addEventListener('DOMContentLoaded', function () {
  var page = window.location.pathname;

  if (page.includes('login.html')) {
    const form = document.getElementById('form');
    const errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const email = document.getElementById('email-input').value.trim();
      const password = document.getElementById('password-input').value.trim();

      if (!email || !password) {
        errorMessage.textContent = "all fields are required  ";
        return;
      }

      const users = JSON.parse(localStorage.getItem('users')) || [];
      const user = users.find(u => u.email === email);

      if (!user) {
        errorMessage.textContent = "email not found!";
        return;
      }

      if (user.password !== password) {
        errorMessage.textContent = "Password incorrect";
        return;
      }

      localStorage.setItem('loggedInUser', JSON.stringify(user));
      window.location.href = 'home.html';
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  var page = window.location.pathname;

  if (page.includes('home.html')) {
    var user = JSON.parse(localStorage.getItem('loggedInUser'));

    if (!user) {
      window.location.href = 'login.html';
    } else {
      var welcomeMessage = document.getElementById('welcome-message');
        welcomeMessage.textContent = `Welcome, ${user.name}!`;
    }

    window.logout = function () {
      localStorage.removeItem('loggedInUser');
      window.location.href = 'login.html';
    };
  }
});












































































// //////////////////////////////////////////////////////////////////////////////////////////////////////////////



