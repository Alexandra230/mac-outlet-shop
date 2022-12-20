let x = document.getElementById('showPasLog');
let pass = document.getElementById('password-login');
x.addEventListener('click', showPass);
function showPass() {
  if (pass.type === 'password') {
    pass.type = 'text';
  } else {
    pass.type = 'password';
  }
}
