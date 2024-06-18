const express = require('express');
const router = express.Router();
const db = require('../config/db.js');

router.get('/admin', async (req, res) => {
  // Check if user is admin
  // if (req.user.role !== 'admin') {
  //   res.status(403).send('Access forbidden');
  //   return;
  // }

  const [results, fields] = await db.query(`select * from users`); 
  const [result, field] = await db.query(`select created_at,email,user_id,username from users where is_user_valid = false;`); 
  res.send({
    all_user: results,
    invalid_user: result
  });
  
  // res.send('Admin dashboard');
});

router.get('/relationship-manager/:id', async(req, res) => {
  // const [results, fields] = await db.query(`select * from users where user_id = ${id}`); 
  // res.send(results)
  res.send('Relationship manager dashboard');
});

router.get('/dealer/:id', async(req, res) => {
  const id = req.params.id;
  const [results, fields] = await db.query(`select * from users where user_id = ${id}`); 
  res.send(results)
  // res.send('Dealer dashboard');
});


module.exports = router;