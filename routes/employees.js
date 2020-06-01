var express = require('express');
var router = express.Router();
var db = require('./db');
var bodyParser = require('body-parser');

router.use(bodyParser.json()); // for parsing application/json
//router.use(bodyParser.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded

/* get method for fetch all employees. */
router.get('/', function (req, res, next) {
  console.log("Called")
  var sql = "SELECT * FROM employees";
  //res.setHeader('Content-Type', 'application/json');
  db.query(sql, function (err, rows, fields) {
    if (err) {
      console.error("Error")
      res.status(500).send({ error: 'Something failed!' })
    }
    // res.json(rows)
    res.send(JSON.stringify({ data: rows }))
  });
})


/*get method for fetch single employee*/
router.get('/:id', function (req, res, next) {
  var id = req.params.id;
  var sql = `SELECT * FROM employees WHERE employee_id=${id}`;
  db.query(sql, function (err, row, fields) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    // res.json(row[0])
    res.send(JSON.stringify({ data: row }))
  })
})
/*post method for create employee*/
router.post('/create', function (req, res, next) {
  var employee_name = req.body.employee_name;
  var phone_no = req.body.phone_no;
  var role = req.body.role;

  var sql = `INSERT INTO employees VALUES ( NULL, '${employee_name}', '${phone_no}', '${role}')`;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({ status: 'success', employee_id: result.insertId })
  })
});

/*put method for update employee*/
router.put('/update/:id', function (req, res, next) {
  var id = req.params.id;
  console.log("hello")
  console.log(req.body)
  var employee_name = req.body.employee_name;
  var phone_no = req.body.phone_no;
  var role = req.body.role;

  var sql = `UPDATE employees SET employee_name="${employee_name}", phone_no="${phone_no}", role="${role}" WHERE employee_id=${id}`;
  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({ 'status': 'success' })
  })
});

/*delete method for delete employee*/
router.delete('/delete/:id', function (req, res, next) {
  var id = req.params.id;
  var sql = `DELETE FROM employees WHERE employee_id=${id}`;

  db.query(sql, function (err, result) {
    if (err) {
      res.status(500).send({ error: 'Something failed!' })
    }
    res.json({ 'status': 'success' })
  })
})

module.exports = router;
