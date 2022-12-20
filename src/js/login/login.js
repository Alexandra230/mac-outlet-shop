import { loadItems } from '../items/loadItems.js';
//import { findItems } from '../main.js';
const LOCALHOST = 'http://localhost:8000/';
const HEROKU = 'https://mac-outlet-shop-new.herokuapp.com/';
let shop = document.getElementById('wrapper');
let tokenUser;
let loginForm = document.getElementById('form-container-login');
import { LocalStorageService } from '../localStorageService.js';
const ls = new LocalStorageService();
let storageToken = ls.get('token') || [];
async function sendForm(e) {
  e.preventDefault();

  let username = document.getElementById('username-login').value;
  let password = document.getElementById('password-login').value;

  const xhr = new XMLHttpRequest();
  xhr.open('POST', `${HEROKU}users/login`, true);

  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      let res = JSON.parse(xhr.response);
      if (res.ok === true) {
        alert(res.msg);
        tokenUser = res.token;
        document.formLogin.reset();
        loginForm.style.display = 'none';
        shop.style.display = 'block';

        if (storageToken == []) {
          storageToken.push(tokenUser);
          ls.set('token', storageToken);
        } else {
          storageToken.shift();
          storageToken.push(tokenUser);
          ls.set('token', storageToken);
        }
        let user = ls.get('user') || [];
        if (user == []) {
          ls.set('user', res.userId);
        } else {
          user.shift();
          user.push(res.userId);
          ls.set('user', user);
        }
        let storageUser = ls.get(`${res.userId}`) || [];

        loadItems(tokenUser);
        //findItems(tokenUser);
      }
    } else if (xhr.status != 200) {
      alert(`Error ${xhr.status}: ${JSON.parse(xhr.response).msg}`);
    }
  };
  xhr.send(`username=${username}&password=${password}`);
}
let form = document.getElementById('form-login');

form.onsubmit = sendForm;
