let x = document.getElementById('showPasReg');
let pass = document.getElementById('password-signup');
x.addEventListener('click', showPass);
function showPass() {
  if (pass.type === 'password') {
    pass.type = 'text';
  } else {
    pass.type = 'password';
  }
}
