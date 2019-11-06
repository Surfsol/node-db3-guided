const express = require('express');

const db = require('../data/db-config.js');
//by using this model doesnt know using express, or doesn't care
const UsersModel = require('./user-model')
const router = express.Router();

router.get('/', (req, res) => {
  //change to UsersModel
  // db('users')
  UsersModel.find()
  .then(users => {
    res.json(users);
  })
  .catch (err => {
    res.status(500).json({ message: 'Failed to get users' });
  });
});

router.get('/:id', (req, res) => {
  // const { id } = req.params;

  // db('users').where({ id })
  // .then(users => {
  //   const user = users[0];
  UsersModel.findById(req.params.id)
    .then(user => {
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'Could not find user with given id.' })
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to get user' });
  });
});

router.post('/', (req, res) => {
  const userData = req.body;

  db('users').insert(userData)
  .then(ids => {
    res.status(201).json({ created: ids[0] });
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to create new user' });
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db('users').where({ id }).update(changes)
  .then(count => {
    if (count) {
      res.json({ update: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to update user' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db('users').where({ id }).del()
  .then(count => {
    if (count) {
      res.json({ removed: count });
    } else {
      res.status(404).json({ message: 'Could not find user with given id' });
    }
  })
  .catch(err => {
    res.status(500).json({ message: 'Failed to delete user' });
  });
});

//sql query: select * from posts where user_id = 2
// router.get('/:id/posts', (req, res) => {
//   db('posts') //want posts db
//   .where({user_id: req.params.id})
//   .then(posts => {
//     res.status(200).json(posts)
//   })
//   .catch(error => {
//     res
//       .status(500)
//       .json({message: 'error retrieving posts for the user', error})
//   })
// })

//join so, we can see who posted it
//sql query: select * from posts where user_id = 2
// router.get('/:id/posts', (req, res) => {
//   db('posts as p') //want posts db
//   .join('users as u', 'u.id', '=', 'p.user_id')// want to join to users table
//   //want user.id = posts.user_id
//   .where({user_id: req.params.id})
//   .then(posts => {
//     res.status(200).json(posts)
//   })
//   .catch(error => {
//     res
//       .status(500)
//       .json({message: 'error retrieving posts for the user', error})
//   })
// })

// router.get('/:id/posts', (req, res) => {
//   db('posts as p') //want posts db
//   .join('users as u', 'u.id', '=', 'p.user_id')// want to join to users table
//   //want user.id = posts.user_id
//   .where({user_id: req.params.id})
//   //specify only things you want
//   .select('p.id', 'p.contents as quote', 'u.username as saidBy')
//   .then(posts => {
//     res.status(200).json(posts)
//   })
//   .catch(error => {
//     res
//       .status(500)
//       .json({message: 'error retrieving posts for the user', error})
//   })
// })

router.get('/:id/posts', (req, res) => {
  UsersModel.findByIdPosts(req.params.id)
  // db('posts as p') //want posts db
  // .join('users as u', 'u.id', '=', 'p.user_id')// want to join to users table
  // //want user.id = posts.user_id
  // .where({user_id: req.params.id})
  // //specify only things you want
  // .select('p.id', 'p.contents as quote', 'u.username as saidBy')
  .then(posts => {
    res.status(200).json(posts)
  })
  .catch(error => {
    res
      .status(500)
      .json({message: 'error retrieving posts for the user', error})
  })
})

module.exports = router;