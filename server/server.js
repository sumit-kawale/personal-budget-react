const { EWOULDBLOCK } = require('constants');
const express = require('express');
const app = express();
const port = 3001;
const cors = require('cors');

app.use(cors());
let budgetdata=require('./budgetdata.json');

app.get('/budget', (req, res)=>{
    res.json(budgetdata);
});

app.listen(port, () =>{
    console.log(`API served at http://localhost:${port}`);
});