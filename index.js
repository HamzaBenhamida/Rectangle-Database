const express = require('express')
const { appendFile } = require('fs')
const path = require('path')
const PORT = process.env.PORT || 5000

var app = express();


app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('pages/index'))
app.get('/database', (req,res) => {
  var data = { results: [1,2,3,4,5]}
  res.render('pages/rect_db', data);
});
app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

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