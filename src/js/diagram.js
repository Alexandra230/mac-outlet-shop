const LOCALHOST = 'http://localhost:8000/';
const RENDER = 'https://app4-eag7.onrender.com/';
const dbtn = document.getElementById('open-diagram');

dbtn.addEventListener('click', () => {
  const cards = document.getElementById('section-items');
  const canvas = document.getElementById('section-diagram');
  if (canvas.style.display === 'none') {
    cards.style.display = 'none';
    canvas.style.display = 'block';
    buildDiagram();
  } else {
    canvas.style.display = 'none';
    cards.style.display = 'block';
  }
});

let captionsList = document.querySelectorAll('.caption-item');
let unitsList = document.querySelectorAll('.unit');

captionsList.forEach(function (item, index) {
  item.addEventListener('mouseover', function () {
    unitsList[index].classList.add('hovered');
  });

  item.addEventListener('mouseout', function () {
    unitsList[index].classList.remove('hovered');
  });
});

unitsList.forEach(function (item, index) {
  item.addEventListener('mouseover', function () {
    captionsList[index].classList.add('hovered');
  });

  item.addEventListener('mouseout', function () {
    captionsList[index].classList.remove('hovered');
  });
});

function buildDiagram() {
  let mac = 0;
  let watch = 0;
  let ipad = 0;
  let iphone = 0;
  let tv = 0;
  let airpods = 0;
  let macarr = document.getElementsByClassName('mac');
  for (let i = 0; i < macarr.length; i++) {
    mac += parseInt(macarr[i].innerText.match(/\d+/));
  }
  let watcharr = document.getElementsByClassName('Watch');
  for (let i = 0; i < watcharr.length; i++) {
    watch += parseInt(watcharr[i].innerText.match(/\d+/));
  }
  let ipadarr = document.getElementsByClassName('ipad');
  for (let i = 0; i < ipadarr.length; i++) {
    ipad += parseInt(ipadarr[i].innerText.match(/\d+/));
  }
  let iphonearr = document.getElementsByClassName('iphone');
  for (let i = 0; i < iphonearr.length; i++) {
    iphone += parseInt(iphonearr[i].innerText.match(/\d+/));
  }
  let tvarr = document.getElementsByClassName('tv');
  for (let i = 0; i < tvarr.length; i++) {
    tv += parseInt(tvarr[i].innerText.match(/\d+/));
  }
  let airpodsarr = document.getElementsByClassName('airpods');
  for (let i = 0; i < airpodsarr.length; i++) {
    airpods += parseInt(airpodsarr[i].innerText.match(/\d+/));
  }
  let common = mac + watch + ipad + iphone + tv + airpods;
  let [pmac, pwatch, pipad, piphone, ptv, pairpods] = [
    Math.round((mac * 100) / common),
    Math.round((watch * 100) / common),
    Math.round((ipad * 100) / common),
    Math.round((iphone * 100) / common),
    Math.round((tv * 100) / common),
    Math.round((airpods * 100) / common),
  ];
  if (pmac + pwatch + pipad + piphone + ptv + pairpods != 100) {
    pmac += 1;
  }
  let units = document.querySelectorAll('.unit');

  units[0].style.strokeDasharray = `${pmac} 100`;
  units[1].style.strokeDasharray = `${pwatch} 100`;
  units[1].style.strokeDashoffset = `-${pmac}`;
  units[2].style.strokeDasharray = `${pipad} 100`;
  units[2].style.strokeDashoffset = `-${pmac + pwatch}`;
  units[3].style.strokeDasharray = `${piphone} 100`;
  units[3].style.strokeDashoffset = `-${pmac + pwatch + pipad}`;
  units[4].style.strokeDasharray = `${ptv} 100`;
  units[4].style.strokeDashoffset = `-${pmac + pwatch + pipad + piphone}`;
  units[5].style.strokeDasharray = `${pairpods} 100`;
  units[5].style.strokeDashoffset = `-${pmac + pwatch + pipad + piphone + ptv}`;
}
