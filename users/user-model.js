const db = require('../data/db-config.js');

module.exports = {
    //method that returns everything, can choose
    find,
    findById,
    findByIdPosts,
}

function find(){
    //return promise
    return db('users')
}

function findById(id) {
    return db('users')
    .where({id})
    .first()
}

function findByIdPosts(userId){
    return db('posts as p')
    .join('users as u', 'u.id', '=', 'p.user_id')// want to join to users table
  //want user.id = posts.user_id
  .where({user_id: userId})
  //specify only things you want
  .select('p.id', 'p.contents as quote', 'u.username as saidBy')
}