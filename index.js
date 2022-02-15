const express = require('express')
const { appendFile } = require('fs')
const path = require('path')
const PORT = process.env.PORT || 5000


const { Pool } = require('pg');
var pool;
pool = new Pool({
  //connectionString: process.env.DATABASE_URL
  connectionString: `postgres://postgres:root@localhost/rectangles`
})

var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));
app.get('/database', (req,res) => {
  var data = { results: [1,2,3,4,5]}
  res.render('pages/rect_db', data);
});

// ADD RECTANGLE: send data of the form to database and update table in index.ejs
app.post('/addrectangle', (req,res) => {
  console.log(req.body)
  var uid = req.body.input-uid;
  var name = req.body.input-name;
  var color = req.body.input-color;
  var width = req.body.input-width;
  var height = req.body.input-height;

  var results = { "uid": uid, 
                  "name": name, 
                  "color":color, 
                  "width":width, 
                  "height":height }

  // ADD RECTANGLE TO THE DATABASE
  var addRectangleQuery = `insert into rectangles values('${uid}', '${name}', '${color}', '${width}', ''${height}) `;
  pool.query(addRectangleQuery, (error,result) => {
    if(error)
      res.end(error);

    res.render('pages/index', results);
  })

});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

  // .get('/', async (req,res)=> {
  //   try {
  //     const result = await pool.query(`SELECT * FROM USERS`);
  //     const data = { results : result.rows };
  //     res.render('pages/rect_db')
  //   } catch (error) {
  //     res.end(error);
  //   }
  // })

  //app.post(())