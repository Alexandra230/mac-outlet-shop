let close = document.getElementById('exit-login');
let signupForm = document.getElementById('form-container-signup');
let toSignupBtn = document.getElementById('to-signup-form');
let loginForm = document.getElementById('form-container-login');
let shop = document.getElementById('wrapper');

close.addEventListener('click', function (e) {
  e.stopPropagation();
  if (loginForm.style.display === 'block') {
    loginForm.style.display = 'none';
  } else {
    loginForm.style.display = 'block';
  }
  shop.style.display = 'block';
});

toSignupBtn.addEventListener('click', function (e) {
  e.preventDefault();
  loginForm.style.display = 'none';
  if (signupForm.style.display === 'block') {
    signupForm.style.display = 'none';
  } else {
    signupForm.style.display = 'block';
  }
});
