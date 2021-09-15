const { default: axios } = require('axios');
const express = require('express')
const http = require('http')
const app = express();
const url  = 'https://pokeapi.co/api/v2/pokemon/';
app.set('view engine', 'ejs')
app.use(express.json())
app.get('/',(req, resp)=>{
    axios.get(url)
    .then((data)=>{
        resp.status(200).render('index',{pk: data.data.results})
    })
    .catch(function (error) {
        resp.status(400).render('index',{error : error})
    })
})
app.get('/:id',(req, resp)=>{
    axios.get(url + req.params.id)
    .then((data)=>{
        console.log("---------"+data.data.name);
        resp.status(200).render('index',{pk: data.data.name})
    })
    .catch(function (error) {
        resp.status(400).render('index',{pk:error,[error] : error})
    })
})

http.createServer(app).listen(8002,()=>{
    console.log("puerto 8002");
})
