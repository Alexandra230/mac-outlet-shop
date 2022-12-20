import { LocalStorageService } from './localStorageService.js';
const LOCALHOST = 'http://localhost:8000/';
const HEROKU = 'https://mac-outlet-shop-new.herokuapp.com/';

const ls = new LocalStorageService();
let openSort = document.getElementById('open-sort');
let container = document.getElementById('cont-show');
let cardsField = document.getElementById('cards');
let cards = document.getElementsByClassName('card');
let colorFilter = [];
let findInput = document.getElementById('searchText');
let os = [];

function main(items) {
  let userId = ls.get('user');
  findInput.addEventListener('input', async function () {
    let t = ls.get('token');
    let xhr = new XMLHttpRequest();
    xhr.open('GET', `${HEROKU}users/name?name=${findInput.value}`);
    xhr.setRequestHeader('x-access-token', t);
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
        let search = JSON.parse(xhr.response);
        outputGoods(search, 30);
      }
    };

    xhr.send();
  });

  openSort.addEventListener('click', function () {
    let x = document.getElementById('sort-fields');
    if (x.style.display === 'block') {
      x.style.display = 'none';
      for (let i = 0; i < cards.length; i++) {
        cards[i].style.width = '30%';
      }
      container.style.justifyContent = 'space-between';
    } else {
      for (let i = 0; i < cards.length; i++) {
        cards[i].style.width = '40%';
      }
      cardsField.style.justifyContent = 'space-around';
      x.style.display = 'block';
    }
  });
  ///////////////////////////////
  let colorSort = document.getElementById('color-sort');
  let colorShow = document.getElementById('color-show');
  let colorField = document.getElementById('color-field');
  // colorField.addEventListener('click', function () {
  //   if (colorShow.getAttribute('class') === 'arrow-right' && colorSort.style.display === 'none') {
  //     colorShow.setAttribute('class', 'arrow-bottom');
  //     colorSort.style.display = 'block';
  //   } else {
  //     colorShow.setAttribute('class', 'arrow-right');
  //     colorSort.style.display = 'none';
  //   }
  // });
  colorShow.addEventListener('click', function () {
    if (colorShow.getAttribute('class') === 'arrow-right' && colorSort.style.display === 'none') {
      colorShow.setAttribute('class', 'arrow-bottom');
      colorSort.style.display = 'block';
    } else {
      colorShow.setAttribute('class', 'arrow-right');
      colorSort.style.display = 'none';
    }
  });
  items.forEach((e) => {
    if (e.color_0) {
      if (colorFilter[e.color_0] == null) {
        colorFilter[e.color_0] = [];
      }
      colorFilter[e.color_0].push(e);
    }
    if (e.color_1) {
      if (colorFilter[e.color_1] == null) {
        colorFilter[e.color_1] = [];
      }
      colorFilter[e.color_1].push(e);
    }
    if (e.color_2) {
      if (colorFilter[e.color_2] == null) {
        colorFilter[e.color_2] = [];
      }
      colorFilter[e.color_2].push(e);
    }
    if (e.color_3) {
      if (colorFilter[e.color_3] == null) {
        colorFilter[e.color_3] = [];
      }
      colorFilter[e.color_3].push(e);
    }
    if (e.color_4) {
      if (colorFilter[e.color_4] == null) {
        colorFilter[e.color_4] = [];
      }
      colorFilter[e.color_4].push(e);
    }
    if (e.color_5) {
      if (colorFilter[e.color_5] == null) {
        colorFilter[e.color_5] = [];
      }
      colorFilter[e.color_5].push(e);
    }
    if (e.os == '') {
      if (os['other'] == null) {
        os['other'] = [];
      }
      os['other'].push(e);
    } else {
      if (os[e.os] == null) {
        os[e.os] = [];
      }
      os[e.os].push(e);
    }
  });

  let colorFlex = document.getElementById('color-flex');
  for (let i = 0; i < Object.keys(colorFilter).length; i++) {
    let check = document.createElement('input');
    let div = document.createElement('div');
    div.setAttribute('class', 'sort-items-div');
    check.type = 'checkbox';
    check.id = `${Object.keys(colorFilter)[i]}`;
    check.value = `${Object.keys(colorFilter)[i]}`;
    let label = document.createElement('label');
    label.setAttribute('for', `${Object.keys(colorFilter)[i]}`);

    label.innerText = `${Object.keys(colorFilter)[i]}`;
    label.appendChild(check);
    div.appendChild(label);
    colorFlex.appendChild(div);
  }

  let priceSort = document.getElementById('price-sort');
  let priceField = document.getElementById('price-field');
  let price = document.getElementById('price-show');
  // priceField.addEventListener('click', function () {
  //   if (price.getAttribute('class') === 'arrow-right' && priceSort.style.display === 'none') {
  //     price.setAttribute('class', 'arrow-bottom');
  //     priceSort.style.display = 'block';
  //   } else {
  //     price.setAttribute('class', 'arrow-right');
  //     priceSort.style.display = 'none';
  //   }
  //   countMinMax();
  // });
  price.addEventListener('click', function () {
    if (price.getAttribute('class') === 'arrow-right' && priceSort.style.display === 'none') {
      price.setAttribute('class', 'arrow-bottom');
      priceSort.style.display = 'block';
    } else {
      price.setAttribute('class', 'arrow-right');
      priceSort.style.display = 'none';
    }
    countMinMax();
  });
  function countMinMax() {
    let min = document.getElementById('from-price');
    let max = document.getElementById('to-price');
    let allPrice = [];
    items.forEach((e) => {
      allPrice.push(Number(e.price));
    });
    let uniqueArray = allPrice.filter(function (item, pos) {
      return allPrice.indexOf(item) == pos;
    });

    let preMax = uniqueArray.sort(function (a, b) {
      return a - b;
    });
    min.setAttribute('min', preMax[0]);
    min.setAttribute('max', preMax[preMax.length - 2]);
    min.setAttribute('placeholder', preMax[0]);

    max.setAttribute('min', preMax[1]);
    max.setAttribute('max', preMax[preMax.length - 1]);
    max.setAttribute('placeholder', preMax[preMax.length - 1]);
  }
  /////////////////////////////////////////////////
  let memorySort = document.getElementById('memory-sort');
  let memoryShow = document.getElementById('memory-show');
  let memoryField = document.getElementById('memory-field');

  // memoryField.addEventListener('click', function () {
  //   if (memoryShow.getAttribute('class') === 'arrow-right' && memorySort.style.display === 'none') {
  //     memoryShow.setAttribute('class', 'arrow-bottom');
  //     memorySort.style.display = 'block';
  //   } else {
  //     memoryShow.setAttribute('class', 'arrow-right');
  //     memorySort.style.display = 'none';
  //   }
  // });

  memoryShow.addEventListener('click', function () {
    if (memoryShow.getAttribute('class') === 'arrow-right' && memorySort.style.display === 'none') {
      memoryShow.setAttribute('class', 'arrow-bottom');
      memorySort.style.display = 'block';
    } else {
      memoryShow.setAttribute('class', 'arrow-right');
      memorySort.style.display = 'none';
    }
  });
  let memory = [];
  for (let i = 0; i < items.length; i++) {
    memory.push(items[i].storage);
  }
  memory = memory.filter((el, id) => memory.indexOf(el) === id);
  let memoryDiv = document.getElementById('memory-sort');

  for (let i = 0; i < memory.length; i++) {
    let check = document.createElement('input');
    let div = document.createElement('div');
    div.setAttribute('class', 'sort-items-div');
    check.type = 'checkbox';
    check.value = `${memory[i]}`;
    let label = document.createElement('label');
    label.setAttribute('for', `${memory[i]}`);
    label.innerText = `${memory[i]} Gb`;
    label.appendChild(check);
    div.appendChild(label);
    memoryDiv.appendChild(div);
  }
  ///////////////////////////////////////////////////
  /////////////////////////////////////////////
  let osSort = document.getElementById('os-sort');
  let osShow = document.getElementById('os-show');
  let osField = document.getElementById('os-field');

  // osField.addEventListener('click', function () {
  //   if (osShow.getAttribute('class') === 'arrow-right' && osSort.style.display === 'none') {
  //     osShow.setAttribute('class', 'arrow-bottom');
  //     osSort.style.display = 'block';
  //   } else {
  //     osShow.setAttribute('class', 'arrow-right');
  //     osSort.style.display = 'none';
  //   }
  // });

  osShow.addEventListener('click', function () {
    if (osShow.getAttribute('class') === 'arrow-right' && osSort.style.display === 'none') {
      osShow.setAttribute('class', 'arrow-bottom');
      osSort.style.display = 'block';
    } else {
      osShow.setAttribute('class', 'arrow-right');
      osSort.style.display = 'none';
    }
  });

  let osDiv = document.getElementById('os-sort');

  for (let i = 0; i < Object.keys(os).length; i++) {
    let check = document.createElement('input');
    let div = document.createElement('div');
    div.setAttribute('class', 'os-div');
    check.type = 'checkbox';
    let label = document.createElement('label');

    check.id = `${Object.keys(os)[i]}`;
    check.value = `${Object.keys(os)[i]}`;
    label.setAttribute('for', `${Object.keys(os)[i]}`);
    label.innerText = `${Object.keys(os)[i]}`;

    div.appendChild(check);
    div.appendChild(label);
    osDiv.appendChild(div);
  }
  /////////////////////////////////////////////
  /////////////////////////////////////////////
  let displaySort = document.getElementById('display-sort');
  let displayShow = document.getElementById('display-show');
  let displayField = document.getElementById('display-field');

  // displayField.addEventListener('click', function () {
  //   if (
  //     displayShow.getAttribute('class') === 'arrow-right' &&
  //     displaySort.style.display === 'none'
  //   ) {
  //     displayShow.setAttribute('class', 'arrow-bottom');
  //     displaySort.style.display = 'block';
  //   } else {
  //     displayShow.setAttribute('class', 'arrow-right');
  //     displaySort.style.display = 'none';
  //   }
  // });

  displayShow.addEventListener('click', function () {
    if (
      displayShow.getAttribute('class') === 'arrow-right' &&
      displaySort.style.display === 'none'
    ) {
      displayShow.setAttribute('class', 'arrow-bottom');
      displaySort.style.display = 'block';
    } else {
      displayShow.setAttribute('class', 'arrow-right');
      displaySort.style.display = 'none';
    }
  });
  /////////////////////////////////////////////////
  const filters = document.querySelector('#sort-fields');

  filters.addEventListener('input', filterGoods);
  let res = 0;

  function filterGoods() {
    const priceMin = document.querySelector('#from-price').value,
      priceMax = document.querySelector('#to-price').value,
      itemColor = [...filters.querySelectorAll('#color-sort input:checked')].map((n) => n.value),
      itemMemory = [...filters.querySelectorAll('#memory-sort input:checked')].map((n) => n.value),
      itemOs = [...filters.querySelectorAll('#os-sort input:checked')].map((n) => {
        if (n.value == 'other') {
          return '';
        } else {
          return n.value;
        }
      }),
      itemDisplay = [...filters.querySelectorAll('#display-sort input:checked')].map((n) => {
        return { id: n.value, from: n.value.split('-')[0], to: n.value.split('-')[1] };
      });

    const filteredItems = items.filter((n) => {
      let isExist = itemColor.find(
        (el) =>
          el == n.color_0 ||
          el == n.color_1 ||
          el == n.color_2 ||
          el == n.color_3 ||
          el == n.color_4 ||
          el == n.color_5,
      );
      let isDisplayExist = itemDisplay.findIndex((item) => {
        return item.from > n.display && item.to > n.display;
      });
      return (
        (!priceMin || priceMin <= n.price) &&
        (!priceMax || priceMax >= n.price) &&
        (!itemColor.length || isExist) &&
        (!itemMemory.length || itemMemory.find((el) => el == String(n.storage))) &&
        (!itemOs.length || itemOs.includes(n.os)) &&
        (!itemDisplay.length || isDisplayExist !== -1)
      );
    });

    outputGoods(filteredItems, 40);
  }

  function outputGoods(products, w) {
    document.getElementById('cards').innerHTML = products
      .map(
        (n) =>
          `
  <div class="card" id="${n.id}" style="width: ${w}%">

    <div class="card-cont"><img src="./img/${n.imgUrl}" alt="apple-tv" class="card-img"/>
  <h2>${n.name}</h2>
  <div class="stock"><span class="${n.orderInfo_inStock > 0 ? 'check' : 'close'}"></span><p><b>${
            n.orderInfo_inStock
          }
  </b> left in stock</p></div>
  <p>Price: <b>${n.price}</b> $</p>
  <button class="addbtn" >Add to cart</button>
   <div class="card-footer"><div class="col1"><img class="like" src="./img/icons/like_filled.png" alt="like" /><p><b>
    ${n.orderInfo_reviews} %</b> Positive reviews</p><p>Above aletage</p>  </div>
  <div class="col2"> <p><b>${Math.round(
    Math.random() * (1000 - 300) + 300,
  )}</b></p> <p>orders</p> </div>  </div></div></div></div> </div>
  `,
      )
      .join('');

    products.forEach((product) => {
      const cardid = product.id;

      const newCard = document.getElementById(`${cardid}`);
      newCard.addEventListener('click', () => cardModal(product));
      const btn = newCard.querySelector('.addbtn');
      if (product.orderInfo_inStock === 0) {
        btn.disabled = 'true';
      }
      let x = 0;
      btn.addEventListener('click', (event) => {
        addToStorage(event, product);
      });
    });
  }

  outputGoods(items, 30);

  function cardModal(element) {
    //items.find((el)=> el.id === element.id)
    let x = document.getElementById('modal');
    x.style.display = 'flex';
    let x1 = document.getElementById('modalBack');
    x1.style.display = 'block';
    let text = '';
    text += '<div class ="modal-img"> <img src="./img/' + element.imgUrl + '" alt=""  /> </div>';
    text += ' <div class="modal-info"> <h2>' + element.name + '</h2> ';
    text +=
      ' <div class="modal-footer"><div class="col01"><img class="like" src="./img/icons/like_filled.png" alt="like" /><p><b>' +
      element.orderInfo_reviews +
      '%</b> Positive reviews</p><p>Above aletage</p>  </div>';
    text +=
      '<div class="col02"> <p><b>' +
      Math.round(Math.random() * (1000 - 300) + 300) +
      '</b></p> <p>orders</p> </div>  </div>';
    text +=
      '<ul class="info-list"> <li class="info-item">Color: <b> ' +
      element.color_0 +
      '</b><b> ' +
      element.color_1 +
      '</b><b> ' +
      element.color_2 +
      '</b><b> ' +
      element.color_3 +
      '</b><b> ' +
      element.color_4 +
      '</b><b> ' +
      element.color_5 +
      '</b></li> <li class="info-item">Operating System:<b>   ' +
      element.os +
      '</b></li> <li class="info-item">Chip:<b>   ' +
      element.chip_name +
      '</b>  </li> <li class="info-item">Height: <b> ' +
      element.size_height +
      ' cm</b></li> <li class="info-item">Width: <b> ' +
      element.size_width +
      ' cm</b></li> <li class="info-item">Depth: <b> ' +
      element.size_depth +
      ' cm</b></li> <li class="info-item">Weight: <b> ' +
      element.size_weight +
      ' g</b></li> </ul>';
    text +=
      '</div> <div class="modal-price"><h2>$ ' +
      element.price +
      '</h2> <span class="leftInStock">Stocks:<b> ' +
      element.orderInfo_inStock +
      '</b> pcs.</span> <button id=' +
      element.id +
      'm class="addbtn">Add to cart</button> </div>';
    x.innerHTML += text;
    let btn = document.getElementById(`${element.id}m`);

    if (items[element.id - 1].orderInfo_inStock === 0) {
      btn.disabled = 'true';
    }
    btn.addEventListener('click', (event) => addToStorage(event, element));
  }
  let bannerBtn = document.getElementById('34b');

  bannerBtn.addEventListener('click', (event) => addToStorage(event, items[10]));
  let storageCart = ls.get(`${userId}`) || [];

  function addToStorage(event, item) {
    const product = storageCart.find((cartProduct) => cartProduct.deviceId === item.id);

    if (!product) {
      const newCartItem = {
        deviceId: item.id,
        imgUrl: item.imgUrl,
        deviceName: item.name,
        devicePrice: item.price,
        quantity: 1,
        totalPrice: item.price,
      };
      storageCart.push(newCartItem);
      addToCart(newCartItem);
      let msg = document.getElementById('msg-div');
      msg.classList.add('msg-active');
      setTimeout(function () {
        msg.classList.remove('msg-active');
      }, 1000);
    }

    if (product && product?.quantity < item.orderInfo_inStock) {
      if (product.quantity < 4) {
        product.quantity++;
        product.totalPrice = product.devicePrice * product.quantity;
        updateCart(product);
        let msg = document.getElementById('msg-div');
        msg.classList.add('msg-active');
        setTimeout(function () {
          msg.classList.remove('msg-active');
        }, 1000);
      }
    }

    ls.set(`${userId}`, storageCart);

    countTotal();
    event.stopPropagation();
  }
  ///////////////////////////////////////////////////

  ////////////////////////////////////////////////

  document.getElementById('modalBack').addEventListener('click', function () {
    let x = document.getElementById('modal');
    x.style.display = 'none';
    let x1 = document.getElementById('modalBack');
    x1.style.display = 'none';
    document.getElementById('modal').innerHTML = '';
  });
  ///////////////////////////////////////////////////////
  const cartcont = document.getElementById('close-cart');
  const cart = document.getElementById('cart');
  cart.addEventListener('click', function () {
    if (cartcont.style.display === 'block') {
      cartcont.style.display = 'none';
    } else {
      cartcont.style.display = 'block';
    }
  });
  cartcont.addEventListener('click', function () {
    if (cartcont.style.display === 'block') {
      cartcont.style.display = 'none';
    } else {
      cartcont.style.display = 'block';
    }
  });
  document.getElementById('modal-cart-section').addEventListener('click', function (e) {
    e.stopPropagation();
  });
  ///////////////////////////////////////////////////////

  let ul = document.getElementById('cart-list');

  function addToCart(element) {
    let li = document.createElement('li');
    let div = document.createElement('div');
    li.setAttribute('id', `li_${element.deviceId}`);
    div.setAttribute('class', 'cart-item-div');
    let deviceInfo = '';
    deviceInfo +=
      '<div><img class="cart-item-img" src = "./img/' + element.imgUrl + '" alt=""  /></div>';
    deviceInfo +=
      '<div class="cart-item-info"><h4>' +
      element.deviceName +
      '</h4><div class="cart-item-price-cont"><span>$</span><span id="itemPrice_' +
      element.deviceId +
      '" class="cart-item-price">' +
      element.totalPrice +
      '</span></div></div>';
    deviceInfo +=
      '<div class="cart-item-count"><button id="minusItem_' +
      element.deviceId +
      '" class="minusItem">-</button><span id="itemCount_' +
      element.deviceId +
      '">' +
      element.quantity +
      '</span><button id="plusItem_' +
      element.deviceId +
      '" class="plusItem">+</button><button id="deleteItem_' +
      element.deviceId +
      '" class="deleteItem">X</button></div>';
    div.innerHTML += deviceInfo;
    li.appendChild(div);
    ul.appendChild(li);
    let minusItem = document.getElementById(`minusItem_${element.deviceId}`);
    let plusItem = document.getElementById(`plusItem_${element.deviceId}`);
    let deleteItem = document.getElementById(`deleteItem_${element.deviceId}`);
    minusItem.addEventListener('click', () => {
      minusItems(minusItem.id);
    });
    plusItem.addEventListener('click', () => {
      plusItems(plusItem.id);
    });
    deleteItem.addEventListener('click', () => {
      deleteItems(deleteItem.id);
    });
  }

  function updateCart(element) {
    document.getElementById(`itemCount_${element.deviceId}`).innerText = element.quantity;
    document.getElementById(`itemPrice_${element.deviceId}`).innerText = element.totalPrice;
  }
  let itemsInStorage = ls.get(`${userId}`);
  if (itemsInStorage && itemsInStorage.length > 0) {
    itemsInStorage.forEach(addToCart);
    countTotal();
  } else {
    console.log('Storage is empty');
  }
  function countTotal() {
    let cartData = ls.get(`${userId}`) || {};
    let totPr = 0;
    let totAm = 0;
    for (let itemKey in cartData) {
      if (cartData.hasOwnProperty(itemKey)) {
        let item = cartData[itemKey];
        totPr += Number(item.totalPrice);
        totAm += item.quantity;
      }
    }
    document.getElementById('totalPrice').innerText = totPr;
    document.getElementById('totalAmount').innerText = totAm;
  }
  ///////////////////////////////////////////////////////////////
  function minusItems(id) {
    id = parseInt(id.match(/\d+/));
    let product = storageCart.find((cartProduct) => cartProduct.deviceId === id);
    if (product.quantity > 1) {
      product.quantity--;
      product.totalPrice = Number(product.totalPrice) - Number(product.devicePrice);
      updateCart(product);
      ls.set(`${userId}`, storageCart);
      countTotal();
    }
  }

  ////////////////////////////////////////////////////////////////////////////
  function plusItems(id) {
    id = parseInt(id.match(/\d+/));
    let product = storageCart.find((cartProduct) => cartProduct.deviceId === id);
    let item = items.find((el) => el.id === id);
    if (product.quantity < item.orderInfo_inStock) {
      if (product.quantity < 4) {
        product.quantity++;
        product.totalPrice = Number(product.totalPrice) + Number(product.devicePrice);
        updateCart(product);
        ls.set(`${userId}`, storageCart);
        countTotal();
      }
    }
  }
  function deleteItems(id) {
    let itemsInStorage = ls.get(`${userId}`);
    if (itemsInStorage) {
      id = parseInt(id.match(/\d+/));
      let product = storageCart.find((cartProduct) => cartProduct.deviceId === id);
      document.getElementById(`li_${product.deviceId}`).remove();
      let index = storageCart.indexOf(product);
      if (index !== -1) {
        storageCart.splice(index, 1);
      }

      ls.set(`${userId}`, storageCart);
      countTotal();
    } else {
      console.log('Cart is empty');
    }
  }
}
export { main };
