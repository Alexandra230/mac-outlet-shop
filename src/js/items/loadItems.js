import { main } from '../main.js';
const LOCALHOST = 'http://localhost:8000/';
const NETLIFY = 'https://sparkly-rugelach-f65699.netlify.app/';
async function loadItems(t) {
  let token = t;
  let items = [];
  let xhr = new XMLHttpRequest();

  xhr.open('GET', `${NETLIFY}users/cards`);
  xhr.setRequestHeader('x-access-token', token);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      items = JSON.parse(xhr.response);
      main(items);
    }
  };

  xhr.send();
}
export { loadItems };
