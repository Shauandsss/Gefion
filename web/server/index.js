const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const mysql = require('mysql');

const db = mysql.createPool({
    host: "127.0.0.1",
    user: 'root',
    password: '',
    database: 'user_gefion'
})

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extented:true}))

app.get('/api/get/index/:groupid', (req, res)=>{
    const groupid = req.params.groupid
    const sqlSelect = "SELECT * FROM STOCKS_QUANTITY A WHERE A.GROUP_ID = ? AND A.DATE = (SELECT MAX(Z.DATE) FROM STOCKS_QUANTITY Z WHERE Z.GROUP_ID = A.GROUP_ID) ORDER BY A.PART DESC"
    db.query(sqlSelect, groupid, (err, result)=> {
        res.send(result)
    })   
})

app.get('/api/get/values/:groupid', (req, res)=>{
    const groupid = req.params.groupid
    const sqlSelect = "SELECT X.ID, X.DATE, X.Value_close FROM stocks_value X WHERE X.ID = ?"
    db.query(sqlSelect, groupid, (err, result)=> {
        res.send(result)
    })   
})

app.get('/api/get/dev/list', (req, res)=>{
    const sqlSelect = "SELECT DISTINCT GROUP_ID FROM STOCKS_QUANTITY WHERE GROUP_ID IN ('IBOV' , 'ICON', 'IBXL', 'IVBX') ORDER BY GROUP_ID"
    db.query(sqlSelect,  (err, result)=> {
        res.send(result)
    })   
})

app.get('/api/get/dev/news', (req, res)=>{
    const sqlSelect = "SELECT * FROM News"
    db.query(sqlSelect,  (err, result)=> {
        res.send(result)
    })   
})

app.get('/api/get/dev/news/content/:id', (req, res)=>{
    const id = req.params.id
    const sqlSelect = "SELECT * FROM News_content where id_news = ?"
    db.query(sqlSelect, id, (err, result)=> {
        res.send(result)
    })   
})




app.post('/api/insert', (req,res) =>{
    const movieName = req.body.movieName
    const movieReview = req.body.movieReview
    const sqlInsert = " INSERT INTO MOVIE_REVIEWS (movieName, movieReview) VALUES (?,?)"
        db.query(sqlInsert, [movieName, movieReview], (err, result)=> {
         console.log(result)
    })
    
})

app.delete('/api/delete/:movieName', (req, res) => {
    const movieName = req.params.movieName
    const sqlDelete = " DELETE FROM MOVIE_REVIEWS WHERE MOVIENAME = ? "
    db.query(sqlDelete, movieName, (err, result)=> {
        if(err) console.log(err)
    })
})


app.put('/api/update', (req, res) => {
    const movieName = req.body.movieName
    const movieReview = req.body.movieReview
    const sqlUpdate = " UPDATE MOVIE_REVIEWS SET MOVIEREVIEW = ? WHERE MOVIENAME = ? "
    db.query(sqlUpdate, [movieReview, movieName], (err, result)=> {
        if(err) console.log(err)
    })
})

app.listen(3001,() => {
    console.log("Running on port 3001")
})