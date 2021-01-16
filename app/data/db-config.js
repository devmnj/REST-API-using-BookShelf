const knex = require('knex');

const config = require('../../knexfile');

const db = knex(config.development);
const bookshelf = require('bookshelf')(db)
module.exports=bookshelf