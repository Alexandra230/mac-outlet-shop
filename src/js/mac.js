import { main } from './main.js';
const LOCALHOST = 'http://localhost:8000/';
const RENDER = 'https://app4-eag7.onrender.com/';
let items = [];
let xhr = new XMLHttpRequest();
const currentUrl = window.location.pathname.substring(1);
console.log(currentUrl);
xhr.open('GET', `${LOCALHOST}users/cards/:${currentUrl}`);
xhr.onreadystatechange = () => {
  if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
    items = JSON.parse(xhr.response);
    main(items);
  }
};

xhr.send();
