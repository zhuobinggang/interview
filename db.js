const csv = require('csv-parser')
const fs = require('fs')
const knex = require('knex')({
  client: 'sqlite3',
  connection: () => ({
    filename: './db.sqlite'
  })
});

function parseCsv(){
  const results = [];
   
  return new Promise((resolve, reject) => {
    fs.createReadStream('./db.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        // console.log(results);
        resolve(results)
        // [
        //   { NAME: 'Daffy Duck', AGE: '24' },
        //   { NAME: 'Bugs Bunny', AGE: '22' }
        // ]
      });
  })
}

function initialize(){
  return knex.schema.createTableIfNotExists('rests', table => {

    table.increments('id')

    table.string('name')
    table.string('one')
    table.string('two')
    table.string('three')
    table.string('four')
    table.string('five')
    table.string('six')
    table.string('seven')

    table.string('type')
    table.string('star')
    table.string('park')
    table.string('waimai')
    table.string('dingjin')
    table.string('pingjia')
    table.string('geo')

  }).finally(() => {
    knex.destroy()
  })
}

function mapTo(rest){
return {
    name: rest['name'],
    one: rest['一'],
    two: rest['二'],
    three: rest['三'],
    four: rest['四'],
    five: rest['五'],
    six: rest['六'],
    seven: rest['日'],
    type: rest['類型'],
    star: rest['米其林星'],
    park: rest['停車'],
    waimai: rest['外送'],
    dingjin: rest['先繳訂金'],
    pingjia: rest['評價'],
    geo: rest['地理位子'],
  }
}

function insertRest(rest){
  return knex('rests').insert(mapTo(rest))
}

function insertRests(rests){
  return knex('rests').insert(rests.map(mapTo))
}

function readAllRest(){
  return knex('rests').select('*')
}

function logAllRest(){
  knex('rests').select('*').then(result => {
    console.log(result)
  })
}


module.exports = {
  parseCsv,
  initialize,
  insertRest,
  readAllRest,
  insertRests,
}