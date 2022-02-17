const express = require('express')
const { appendFile } = require('fs')
const path = require('path')
const PORT = process.env.PORT || 5000


const { Pool } = require('pg');
var pool;
pool = new Pool({
  //connectionString: process.env.DATABASE_URL
  connectionString: `postgres://postgres:Benkendo7210@localhost/rectangles`
})

var app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('pages/index'));

//VIEW ALL RECTANGLES in MAIN PAGE (rec_db.ejs)
app.get('/database', (req,res) => {

  var viewAllQuery = `SELECT * FROM rec`;
  pool.query(viewAllQuery, (error,result) => {
    if(error)
      console.log(error);
      //res.end(error);

    console.log(result);
    const rows = result.rows
    
    res.render('pages/rec_db', {rows});
  });
});

//UPDATE values in display_rec.ejs
app.get('/display', (req,res) => {

  var selectRecQuery = `SELECT * FROM rec where `;
  pool.query(viewAllQuery, (error,result) => {
    if(error)
      console.log(error);
      //res.end(error);

    console.log(result);
    const rows = result.rows
    
    res.render('pages/display_rec', {rows});
  });
});

// ADD RECTANGLE: send data of the form to database and update table in index.ejs
app.post('/addrectangle', (req,res) => {
  let ending = '...'

  //checking for errors in format of inputs
  var name = req.body.input-name;
  if(name.lenght > 20){
    name = name.substring(0, 20 - ending.length) + ending;
  }
  var color = req.body.input-color;
  if(name.lenght > 20){
    color = color.substring(0, 20 - ending.length) + ending;
  }
  var width = req.body.input-width;
  if (width<0){
    width = Math.abs(width);
  }
  var height = req.body.input-height;
  if (height<0){
     height = Math.abs(height);
  }

  // ADD RECTANGLE TO THE DATABASE
  var addRectangleQuery = `INSERT INTO rec values (DEFAULT, '${name}', ${width}, ${height},'${color}') `;
  pool.query(addRectangleQuery, (error,result) => {
    if(error)
      console.log(error);

    res.redirect('/database');
  })

});

// UPDATE RECTANGLE: send data of the form to sql and update values in .ejs
app.post('/updaterectangle', (req,res) => {
  let ending = '...'

  //checking for errors in format of inputs
  var name = req.body.input-name;
  if(name.lenght > 20){
    name = name.substring(0, 20 - ending.length) + ending;
  }
  var color = req.body.input-color;
  if(name.lenght > 20){
    color = color.substring(0, 20 - ending.length) + ending;
  }
  var width = req.body.input-width;
  if (width<0){
    width = Math.abs(width);
  }
  var height = req.body.input-height;
  if (height<0){
     height = Math.abs(height);
  }

  // ADD RECTANGLE TO THE DATABASE
  var updateRectangleQuery = `INSERT INTO rec values (DEFAULT, '${name}', ${width}, ${height},'${color}') `;
  pool.query(updateRectangleQuery, (error,result) => {
    if(error)
      console.log(error);

    res.redirect('/display');
  })

});

// DELETE rectangle
app.post('/deleterectangle', (req,res) => {
  console.log(req);
  let uid = req.body.id;
  console.log(uid);

  let deleteRectangleQuery = `DELETE from rec WHERE uid=${uid}`;
  pool.query(deleteRectangleQuery, (error,result) => {
    if(error)
      console.log(error);

    res.redirect('/database');
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