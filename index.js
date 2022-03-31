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
    //if(error)
      //console.log(error);
      //res.end(error);

    //console.log(result);
    const rows = result.rows
    
    res.render('pages/rec_db', {rows});
  });
});


//UPDATE values in display_rec.ejs
app.get('/:id', (req,res) => {

  // get uid not working
  let uid = req.params.id;
  console.log("UID => ",uid)

  var selectRecQuery = `SELECT * FROM rec where uid='${uid}'`;
  pool.query(selectRecQuery, (error,result) => {
    if(error)
      console.log(error);
      //res.end(error);

    //console.log(result);
    const rec = {results : result.rows}
    
    res.render('pages/display_rec', rec);
  });
});

// ADD RECTANGLE: send data of the form to database and update table in index.ejs
app.post('/addrectangle', (req,res) => {
  let ending = '...'

  //checking for errors in format of inputs
  var name = req.body.inputName;
  console.log(name)
  if(name.length > 20){
    name = name.substring(0, 20 - ending.length) + ending;
  }
 
  var color = req.body.inputColor;
  console.log(color)
  if(name.length > 20){
    color = color.substring(0, 20 - ending.length) + ending;
  }
  var width = req.body.inputWidth;
  console.log(width)
  if (width<0){
    width = Math.abs(width);
  }
  
  var height = req.body.inputHeight;
  console.log(height)
  if (height<0){
     height = Math.abs(height);
  }

  console.log(name,height,color, width)
  // ADD RECTANGLE TO THE DATABASE
  var addRectangleQuery = `INSERT INTO rec (name,width,height,color) values ('${name}', ${width}, ${height},'${color}') `;
  pool.query(addRectangleQuery, (error,result) => {
    //if(error)
      //console.log(error);

    res.redirect('/database');
  })

});

// UPDATE RECTANGLE: send data of the form to sql and update values in .ejs
app.post('/updaterectangle', async (req,res) => {
  let ending = '...'

  var uid = req.body.uid
  
  //checking for errors in format of inputs
  var name = req.body.inputName;
  if (name != "") 
  {
    if(name.length > 20)
    {
      name = name.substring(0, 20 - ending.length) + ending;
    }

    console.log(name)
    await pool.query(`UPDATE rec SET name='${name}' WHERE uid=${uid}`)
    console.log("name updated")
  }

  var color = req.body.inputColor;

  if (color != "") {
  
    if(name.length > 20){
    color = color.substring(0, 20 - ending.length) + ending;
    }

    //console.log(color)
    await pool.query(`UPDATE  rec SET color='${color}' WHERE uid=${uid}`)
  }
  

  var width = req.body.inputWidth;
  if (width != "") {
    
    if (width<0){
    width = Math.abs(width);
  }
    //console.log(width)
    await pool.query(`UPDATE rec SET width=${width} WHERE uid=${uid}`)
  }
  
  var height = req.body.inputHeight;
  if (height != "") {

    if (height<0){
     height = Math.abs(height);
  }
    //console.log(height)
    await pool.query(`UPDATE rec SET height=${height} WHERE uid=${uid}`)
  }
  
  console.log('redirecting')
  res.redirect('/database');
  
});

// DELETE rectangle
app.get('/deleterectangle/:id/delete', (req,res) => {
  console.log(req);
  let uid =  req.params.id;
  console.log(uid);

  let deleteRectangleQuery = `DELETE from rec WHERE uid=${uid}`;
  pool.query(deleteRectangleQuery, (error,result) => {
    if(error)
      console.log(error);

    res.redirect('/database');
  })
});

app.listen(PORT, () => console.log(`Listening on ${ PORT }`));

