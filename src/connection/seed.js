const Items = require('../models/itemsShema.js');
const mongoose = require('./mongoDB.js');
const fs = require('fs');
const csv = require('csv-parser');

let itemsData = [];
fs.createReadStream('device.csv')
  .pipe(csv())
  .on('data', (data) => itemsData.push(data))
  .on('end', () => {
    let users = itemsData;
    mongoose();
    users.map(function (data) {
      let items = new Items(data);
      items.save(data);
    });
  });
