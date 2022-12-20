let close = document.getElementById('exit-signup');
let signupForm = document.getElementById('form-container-signup');
let toLoginBtn = document.getElementById('to-login-form');
let loginForm = document.getElementById('form-container-login');
let shop = document.getElementById('wrapper');

close.addEventListener('click', function (e) {
  e.stopPropagation();
  if (signupForm.style.display === 'block') {
    signupForm.style.display = 'none';
  } else {
    signupForm.style.display = 'block';
  }
  shop.style.display = 'block';
});

toLoginBtn.addEventListener('click', function (e) {
  e.preventDefault();
  signupForm.style.display = 'none';
  if (loginForm.style.display === 'block') {
    loginForm.style.display = 'none';
  } else {
    loginForm.style.display = 'block';
  }
});
